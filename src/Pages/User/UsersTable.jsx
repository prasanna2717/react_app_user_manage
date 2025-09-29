


import React from 'react';
import { Table, Avatar, Space, Button, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const UsersTable = ({ users, loading, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Profile',
      dataIndex: 'profile',
      key: 'profile',
      width: 80, 
      render: (url) => <Avatar size={48} src={url} icon={<UserOutlined />} />,
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'First Name', dataIndex: 'firstname', key: 'firstname' },
    { title: 'Last Name', dataIndex: 'lastname', key: 'lastname' },
    {
      title: 'Action',
      key: 'action',
      width: 160,
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => onDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      <Table
        columns={columns}
        dataSource={users.map((u, i) => ({ ...u, key: i }))}
        loading={loading}
        pagination={false}
        locale={{ emptyText: <Empty description="No Data Found" /> }}
        scroll={{ x: 800 }} 
      />
    </div>
  );
};

export default UsersTable;
