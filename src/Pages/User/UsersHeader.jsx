import React from 'react';
import { Button, Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

const UsersHeader = ({ username = 'Elon Musk', onLogout }) => (
  <Header
    style={{
      background: '#001529',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: '0 24px',
    }}
  >
    <span style={{ color: 'white', fontWeight: 600, marginRight: 16 }}>
      {username}
    </span>
    <Button danger type="primary" icon={<LogoutOutlined />} onClick={onLogout} />
  </Header>
);

export default UsersHeader