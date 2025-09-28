// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../redux/auth/authAction';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import './Login.css';

// // ✅ Validation schema
// const schema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   remember: Yup.boolean()
// });

// const LoginPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       email: 'eve.holt@reqres.in',
//       password: 'cityslicka',
//       remember: true
//     }
//   });

//   const onSubmit = async (data) => {
//     await dispatch(login(data.email, data.password));
//     if (localStorage.getItem('token')) {
//       navigate('/users');
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit(onSubmit)} className="login-box">

//         <div className="input-wrapper">
//           <input
//             type="email"
//             placeholder="Email"
//             {...register('email')}
//             className="input-with-icon"
//           />
//           <span className="input-icon">&#x2709;</span>
//         </div>
//         {errors.email && <p className="error">{errors.email.message}</p>}

//         <div className="input-wrapper">
//           <input
//             type="password"
//             placeholder="Password"
//             {...register('password')}
//             className="input-with-icon"
//           />
//           <span className="input-icon">&#x1F512;</span>
//         </div>
//         {errors.password && <p className="error">{errors.password.message}</p>}

//         <label className="checkbox">
//           <input type="checkbox" {...register('remember')} />
//           Remember me
//         </label>

//         {error && <p className="error">{error}</p>}

//         <button type="submit" disabled={loading}>
//           {loading ? 'Logging in...' : 'Log in'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/authAction';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Typography, Alert, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { decryptData, encryptData } from '../../helpers/commonMethods';

const { Title } = Typography;

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
  useEffect(() => {
    const isRemember = JSON.parse(localStorage.getItem('rememberMe'))
    if (isRemember) {
      console.log(isRemember, "isRemember")
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
    await dispatch(login(email, password));
    if (localStorage.getItem('token')) {
      navigate('/users');
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
          {/* Email */}
          <Form.Item
            // label="Email"

            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Invalid email format' },
            ]}
          >
            <Input prefix={<UserOutlined />} autoComplete='off' placeholder="Enter your email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            // label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} autoComplete='off' placeholder="Enter your password" />
          </Form.Item>

          {/* Remember me */}
          <Form.Item name="rememberMe" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          {/* Submit Button */}
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