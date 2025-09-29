import React, { useEffect, useState } from 'react';
import { Layout, Card, Tabs, Input, Button, Pagination, Modal ,message} from 'antd';
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

    const debouncedSearchText = useDebounce(searchText, 500); 

    useEffect(() => {
        dispatch(getUsers(currentPage, 5, debouncedSearchText));
    }, [dispatch, currentPage, debouncedSearchText]);

const handleLogout = () => {
  messageApi.success('You have been logged out successfully');

  setTimeout(() => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }, 1500);
};

    const handleCreate = () => {
        setEditingUser(null);
        
        setIsModalVisible(true);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setIsModalVisible(true);
    };

   const [messageApi, contextHolder] = message.useMessage();


   const handleModalSubmit = async (values, form) => {
  try {
    let result;

    if (editingUser?._id) {
      result = await dispatch(updateUser(editingUser._id, values));
    } else {
              form.resetFields();

      result = await dispatch(createUser(values));
      
    }

    if (result.success) {
      messageApi.success(result.message);
      form.resetFields();
      setIsModalVisible(false);
    } else {
      messageApi.error(result.message);
    }
  } catch (error) {
    messageApi.error('Unexpected error. Please try again.');
  }
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

const handleDeleteConfirm = async () => {
  try {
    const result = await dispatch(deleteUser(selectedUserId));

    if (result.success) {
      messageApi.success(result.message || 'Deleted successfully');
    } else {
      messageApi.error(result.message || 'Failed to delete user');
    }

    setIsDeleteModalVisible(false);
  } catch (error) {
    messageApi.error('Unexpected error. Please try again.');
  }
};


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <UsersHeader onLogout={handleLogout} />

            <Content style={{ background: '#f5f7fa', padding: '24px' }}>
                {contextHolder}

                <Card style={{ borderRadius: 8 }}>

                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',             
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: 16,
                        }}
                    >
                        <h4 style={{ margin: 0 }}>Users</h4>

                        <div
                            style={{
                                display: 'flex',
                                gap: '12px',
                                flexGrow: 1,
                                flexWrap: 'nowrap',         
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

                    <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
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
