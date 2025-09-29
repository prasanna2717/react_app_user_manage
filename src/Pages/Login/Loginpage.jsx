import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/authAction';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Typography, Alert, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { decryptData, encryptData } from '../../helpers/commonMethods';


const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { loading, error,successMsg } = useSelector((state) => state.auth);
  const [formReset, setFormReset] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const isRemember = JSON.parse(localStorage.getItem('rememberMe'))
    if (isRemember) {
      const enc_email = localStorage.getItem('enc_email')
      const enc_pass = localStorage.getItem('enc_pass')
      const dec_email = decryptData(enc_email)
      const dec_pass = decryptData(enc_pass)
      form.setFieldsValue({
        email: dec_email,
        password: dec_pass,
        rememberMe: isRemember,
      })
    } else {
      form.setFieldsValue({
        email: '',
        password: '',
        rememberMe: false,
      })
    }
  }, [])
  const onFinish = async (values) => {
    const { email, password, rememberMe } = values
    localStorage.setItem('rememberMe', JSON.stringify(rememberMe))
    if (rememberMe) {
      const enc_email = encryptData(email)
      const enc_pass = encryptData(password)
      enc_email && localStorage.setItem('enc_email', enc_email)
      enc_pass && localStorage.setItem('enc_pass', enc_pass)
    } else {
      const keysToRemove = ['enc_email', 'enc_pass'];
      keysToRemove.forEach((key) => {
        localStorage.removeItem(key);
      });
    }
const result = await dispatch(login(email, password));
console.log(result)
  if (result.success) {
    console.log("first")
    messageApi.success(result.message);
     setTimeout(() => {
      navigate('/users');
    }, 1500);
  } else {
    messageApi.error(result.message);
  }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f0f2f5',
      }}
    >
    {contextHolder}

      <Card style={{ width: 350, padding: '20px' }}>


        {error && (
          <Alert
            message="Login Failed"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form
          form={form}
          name="loginForm"
          initialValues={{
            email: formReset.email,//eve.holt@reqres.in
            password: formReset.password,//cityslicka
            remember: formReset.rememberMe,
          }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item

            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Invalid email format' },
            ]}
          >
            <Input prefix={<UserOutlined />} autoComplete='off' placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} autoComplete='off' placeholder="Enter your password" />
          </Form.Item>

          <Form.Item name="rememberMe" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;