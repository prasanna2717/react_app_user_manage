// import React from 'react';
// import { Table, Avatar, Space, Button, Empty } from 'antd';
// import {  UserOutlined } from '@ant-design/icons';

// const UsersTable = ({ users, loading, onEdit,onDelete }) => {
//   const columns = [
//     {
//       title: 'Profile',
//       dataIndex: 'profile',
//       key: 'profile',
//       render: (url) => <Avatar size={48} src={url} icon={<UserOutlined />} />,
//     },
//     { title: 'Email', dataIndex: 'email', key: 'email', render: (text) => <a>{text}</a> },
//     { title: 'First Name', dataIndex: 'firstname', key: 'firstname' },
//     { title: 'Last Name', dataIndex: 'lastname', key: 'lastname' },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record) => (
//         <Space>
//           <Button type="primary"  onClick={() => onEdit(record)}>
//             Edit
//           </Button>
//           <Button  type="primary" danger onClick={()=>onDelete(record._id)}  >Delete</Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <Table
//       columns={columns}
//       dataSource={users.map((u, i) => ({ ...u, key: i }))}
//       loading={loading}
//       pagination={false}
//        locale={{ emptyText: <Empty description="No Data Found" /> }}
//     />
//   );
// };

// export default UsersTable

// import React from 'react';
// import { Table, Avatar, Space, Button, Empty } from 'antd';
// import { UserOutlined } from '@ant-design/icons';

// const UsersTable = ({ users, loading, onEdit, onDelete }) => {
//   const columns = [
//     {
//       title: 'Profile',
//       dataIndex: 'profile',
//       key: 'profile',
//       width: 80,
//       render: (url) => <Avatar size={48} src={url} icon={<UserOutlined />} />,
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//       key: 'email',
//       responsive: ['sm'], // show on small screens and above
//       render: (text) => <a>{text}</a>,
//     },
//     {
//       title: 'First Name',
//       dataIndex: 'firstname',
//       key: 'firstname',
//       responsive: ['sm'],
//     },
//     {
//       title: 'Last Name',
//       dataIndex: 'lastname',
//       key: 'lastname',
//       responsive: ['sm'],
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       width: 160,
//       render: (_, record) => (
//         <Space>
//           <Button type="primary" onClick={() => onEdit(record)}>
//             Edit
//           </Button>
//           <Button type="primary" danger onClick={() => onDelete(record._id)}>
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <Table
//       columns={columns}
//       dataSource={users.map((u, i) => ({ ...u, key: i }))}
//       loading={loading}
//       pagination={false}
//       locale={{ emptyText: <Empty description="No Data Found" /> }}
//       scroll={{ x: 'max-content' }} // horizontal scroll for small screens
//       style={{ overflowX: 'auto' }}
//     />
//   );
// };

// export default UsersTable;


import React from 'react';
import { Table, Avatar, Space, Button, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const UsersTable = ({ users, loading, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Profile',
      dataIndex: 'profile',
      key: 'profile',
      width: 80, // keeps avatar column compact
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
        scroll={{ x: 800 }} // allows horizontal scroll
      />
    </div>
  );
};

export default UsersTable;
