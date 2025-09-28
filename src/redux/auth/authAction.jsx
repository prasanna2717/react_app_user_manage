import { message } from 'antd';
import axios from 'axios';
import { BASE_URL } from '../../helpers/secret';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });

  try {
    const res = await axios.post(`${BASE_URL}/api/auth/login`, {
      email,
      password,
    });

    const token = res.data.token;
    localStorage.setItem('token', token);
    message.success(res.data.message)
    dispatch({ type: 'LOGIN_SUCCESS', payload: token });
  } catch (error) {
    console.log(error,"error")
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response?.data?.error || 'Login failed',
    });
  }
};

export const getUsers = (page = 1, limit = 5, search = '') => async (dispatch) => {
  dispatch({ type: 'GET_USERS_REQUEST' });

  try {
    const res = await axios.get(`${BASE_URL}/api/auth/getuserlist`, {
      params: { page, limit, search },
    });
    dispatch({ type: 'GET_USERS_SUCCESS', payload: res?.data?.users||[],total:res?.data?.total });
  } catch (error) {
    dispatch({
      type: 'GET_USERS_FAILURE',
      payload: error.response?.data?.message || 'Failed to fetch users',
    });
  }
};


export const createuser = (email, password) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });

  try {
    const res = await axios.post(`${BASE_URL}/api/auth/login`, {
      email,
      password,
    });

    const token = res.data.token;
    localStorage.setItem('token', token);

    dispatch({ type: 'LOGIN_SUCCESS', payload: token });
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response?.data?.error || 'Login failed',
    });
  }
};


export const createUser = (userData) => async (dispatch) => {
  dispatch({ type: 'CREATE_USER_REQUEST' });

  try {
    const res = await axios.post(`${BASE_URL}/api/auth/createUser`, userData);
    dispatch({ type: 'CREATE_USER_SUCCESS', payload: res.data });
    dispatch(getUsers()); // refresh list
  } catch (error) {
    dispatch({
      type: 'CREATE_USER_FAILURE',
      payload: error.response?.data?.message || 'Failed to create user',
    });
  }
};
  
export const updateUser = (id, userData) => async (dispatch) => {
  dispatch({ type: 'UPDATE_USER_REQUEST' });

  try {
    const res = await axios.put(`${BASE_URL}/api/auth/updateuser/${id}`, userData);
    dispatch({ type: 'UPDATE_USER_SUCCESS', payload: res.data });
    dispatch(getUsers()); // refresh list
  } catch (error) {
    dispatch({
      type: 'UPDATE_USER_FAILURE',
      payload: error.response?.data?.message || 'Failed to update user',
    });
  } 
};

export const deleteUser = (id, userData) => async (dispatch) => {
  dispatch({ type: 'DELETE_USER_REQUEST' });

  try {
    const res = await axios.delete(`${BASE_URL}/api/auth/deleteuser/${id}`, userData);
    dispatch({ type: 'DELETE_USER_SUCCESS', payload: res.data });
    dispatch(getUsers()); // refresh list
  } catch (error) {
    dispatch({
      type: 'DELETE_USER_FAILURE',
      payload: error.response?.data?.message || 'Failed to update user',
    });
  }



  
};