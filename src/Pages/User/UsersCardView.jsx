import React, { useState } from 'react';
import { Card, Avatar, Tooltip, Empty } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const UsersCardView = ({ users, onEdit, onDelete }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!users || users.length === 0) {
    return (
      <div style={{ padding: '40px 0', textAlign: 'center' }}>
        <Empty description="No Data Found" />
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '16px',
        marginTop: 16,
      }}
    >
      {users.map((user, i) => (
        <Card
          key={i}
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            position: 'relative',
            boxShadow:
              hoveredIndex === i
                ? '0 4px 12px rgba(0,0,0,0.2)'
                : '0 1px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Avatar Section */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 16,
              paddingBottom: 16,
            }}
          >
            <Avatar
              size={90}
              src={user.profile}
              icon={<UserOutlined />}
              style={{
                filter: hoveredIndex === i ? 'blur(2px) brightness(0.6)' : 'none',
                transition: '0.3s ease',
              }}
            />

            {/* Overlay Icons */}
            {hoveredIndex === i && (
              <div
                style={{
                  position: 'absolute',
                  display: 'flex',
                  gap: '14px',
                }}
              >
                <Tooltip title="Edit">
                  <div
                    onClick={() => onEdit(user)}
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      background: '#7265e6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    <EditOutlined style={{ fontSize: 20 }} />
                  </div>
                </Tooltip>
                <Tooltip title="Delete">
                  <div
                    onClick={() => onDelete(user._id)}
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      background: '#ff4d4f',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    <DeleteOutlined style={{ fontSize: 20 }} />
                  </div>
                </Tooltip>
              </div>
            )}
          </div>

          {/* Card Content */}
          <Card.Meta
            style={{ textAlign: 'center' }}
            title={<div style={{ fontWeight: 600 }}>{`${user.firstname} ${user.lastname}`}</div>}
            description={<div style={{ color: '#555' }}>{user.email}</div>}
          />
        </Card>
      ))}
    </div>
  );
};

export default UsersCardView;
