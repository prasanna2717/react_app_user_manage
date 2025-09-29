import { Modal, Button } from 'antd';

<Modal
  visible={isDeleteModalVisible}
  title="Confirm Delete"
  onCancel={() => setIsDeleteModalVisible(false)}
  footer={[
    <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
      Cancel
    </Button>,
    <Button
      key="delete"
      type="primary"
      danger
      onClick={() => {
        dispatch(deleteUser(selectedUserId));
        setIsDeleteModalVisible(false);
      }}
    >
      Delete
    </Button>,
  ]}
>
  <p>Are you sure you want to delete this user?</p>
</Modal>
