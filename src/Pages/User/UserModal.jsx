import React from 'react';
import { Modal, Form, Input } from 'antd';

const UserModal = ({ visible, onCancel, onSubmit, initialValues = {} }) => {
  const [form] = Form.useForm();
  console.log(initialValues,"initialValues")
  form.setFieldsValue(initialValues);

  return (
    <Modal
      title={initialValues?._id ? 'Edit User' : 'Create New User'}
      visible={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form.validateFields().then((values) => onSubmit(values, form));
      }}
      okText="Submit"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item label="First Name" name="firstname" rules={[{ required: true, message: 'Please enter first name' }]}>
          <Input placeholder="Please enter first name" />
        </Form.Item>
        <Form.Item label="Last Name" name="lastname" rules={[{ required: true, message: 'Please enter last name' }]}>
          <Input placeholder="Please enter last name" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Enter a valid email' }]}>
          <Input placeholder="Please enter email" />
        </Form.Item>
        <Form.Item
          label="Profile Image Link"
          name="profile"
          rules={[
            { required: true, message: 'Please enter profile image link' },
          ]}
        >
          <Input placeholder="Please enter profile image link" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal