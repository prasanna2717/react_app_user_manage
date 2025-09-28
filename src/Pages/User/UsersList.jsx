import React, { useEffect, useState } from 'react';
import { Layout, Card, Tabs, Input, Button, Pagination, Modal } from 'antd';
import { TableOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, createUser, updateUser, deleteUser } from '../../redux/auth/authAction';

import UsersHeader from './UsersHeader';
import UsersTable from './UsersTable';
import UsersCardView from './UsersCardView';
import UserModal from './UserModal';
import useDebounce from '../../hooks/useDebounce';

const { Content } = Layout;
const { Search } = Input;
const { confirm } = Modal;

// Custom debounce hook here (or import from separate file)
// function useDebounce(value, delay) {
//     const [debouncedValue, setDebouncedValue] = useState(value);

//     useEffect(() => {
//         const handler = setTimeout(() => setDebouncedValue(value), delay);
//         return () => clearTimeout(handler);
//     }, [value, delay]);

//     return debouncedValue;
// }

function UsersList() {
    const dispatch = useDispatch();
    const { users = [], total = 0, loading, error } = useSelector((state) => state.userList);
    const [activeTab, setActiveTab] = useState('table');
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const debouncedSearchText = useDebounce(searchText, 500); // 500ms debounce

    // Fetch users whenever page or debounced search changes
    useEffect(() => {
        dispatch(getUsers(currentPage, 5, debouncedSearchText));
    }, [dispatch, currentPage, debouncedSearchText]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const handleCreate = () => {
        setEditingUser(null);
        setIsModalVisible(true);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setIsModalVisible(true);
    };

    const handleDelete = (userId) => {
        confirm({
            title: 'Are you sure you want to delete this user?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                dispatch(deleteUser(userId));
            },
            onCancel() {
                console.log('Delete cancelled');
            },
        });
    };

    const handleModalSubmit = (values, form) => {
        if (editingUser?._id) dispatch(updateUser(editingUser._id, values));
        else dispatch(createUser(values));
        form.resetFields();
        setIsModalVisible(false);
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const showDeleteModal = (userId) => {
        setSelectedUserId(userId);
        setIsDeleteModalVisible(true);
    };

    const handleDeleteConfirm = () => {
        dispatch(deleteUser(selectedUserId));
        setIsDeleteModalVisible(false);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <UsersHeader onLogout={handleLogout} />

            <Content style={{ background: '#f5f7fa', padding: '24px' }}>
                <Card style={{ borderRadius: 8 }}>

                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',             // allow wrapping on small screens
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: 16,
                        }}
                    >
                        {/* Title */}
                        <h4 style={{ margin: 0 }}>Users</h4>

                        {/* Search + Button */}
                        <div
                            style={{
                                display: 'flex',
                                gap: '12px',
                                flexGrow: 1,
                                flexWrap: 'nowrap',         // prevent wrapping on large screens
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                minWidth: 200,
                            }}
                        >
                            <Search
                                placeholder="Search users"
                                onChange={handleSearchChange}
                                allowClear
                                style={{ flexGrow: 1, minWidth: 180, maxWidth: 250 }}
                            />
                            <Button type="primary" onClick={handleCreate}>
                                Create User
                            </Button>
                        </div>
                    </div>


                    {/* Tabs */}
                    <Tabs
                        activeKey={activeTab}
                        onChange={setActiveTab}
                        items={[
                            { key: 'table', label: (<span><TableOutlined /> Table</span>) },
                            { key: 'card', label: (<span><AppstoreOutlined /> Card</span>) },
                        ]}
                    />

                    {activeTab === 'table' && (
                        <UsersTable users={users} loading={loading} onDelete={showDeleteModal} onEdit={handleEdit} />
                    )}

                    {activeTab === 'card' && (
                        <UsersCardView
                            users={users}
                            onDelete={showDeleteModal}
                            selectedCardIndex={selectedCardIndex}
                            onSelectCard={setSelectedCardIndex}
                            onEdit={handleEdit}
                        />
                    )}

                    {/* ✅ Responsive Pagination */}
                    <div style={{ marginTop: 16, textAlign: 'center' }}>
                        <Pagination
                            current={currentPage}
                            total={total}
                            pageSize={5}
                            onChange={handlePageChange}
                            responsive
                        />
                    </div>

                    {error && <p style={{ color: 'red', marginTop: 16 }}>{error}</p>}

                    <UserModal
                        visible={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        onSubmit={handleModalSubmit}
                        initialValues={editingUser}
                    />

                    <Modal
                        open={isDeleteModalVisible}
                        title="Confirm Delete"
                        onCancel={() => setIsDeleteModalVisible(false)}
                        footer={[
                            <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
                                Cancel
                            </Button>,
                            <Button key="delete" type="primary" danger onClick={handleDeleteConfirm}>
                                Delete
                            </Button>,
                        ]}
                    >
                        <p>Are you sure you want to delete this user?</p>
                    </Modal>
                </Card>
            </Content>
        </Layout>
    );
}

export default UsersList;
