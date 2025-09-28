import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const LoginAuthRoute = ( ) => {
  const token = localStorage.getItem('token');
  return !token ? <Outlet/> : <Navigate to="/users" />;
};

export default LoginAuthRoute