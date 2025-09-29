import { message } from 'antd';
import axios from 'axios';
import { BASE_URL } from '../../helpers/secret';

const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`
}
export const login = (email, password) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });

  try {
    const res = await axios.post(`${BASE_URL}/api/auth/login`, {
      email,
      password,
    });

    const token = res.data.token;
    localStorage.setItem('token', token);
    
    dispatch({ type: 'LOGIN_SUCCESS', payload: token });

        return { success: true, message: res.data.message || 'Login successful' };
  } catch (error) {
        const errorMsg = error.response?.data?.message || 'Login failed';
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response?.data?.error || 'Login failed',
    });
        return { success: false, message: errorMsg };
  }
};

export const getUsers = (page = 1, limit = 5, search = '') => async (dispatch) => {
  dispatch({ type: 'GET_USERS_REQUEST' });

  try {

     const token = localStorage.getItem("token"); // ✅ read fresh token
    const headers = { Authorization: `Bearer ${token}` };
    const res = await axios.get(`${BASE_URL}/api/auth/getuserlist`, {
      params: { page, limit, search },
      headers
    });
    dispatch({ type: 'GET_USERS_SUCCESS', payload: res?.data?.users || [], total: res?.data?.total });
  } catch (error) {
    dispatch({
      type: 'GET_USERS_FAILURE',
      payload: error.response?.data?.message || 'Failed to fetch users',
    });
  }
};



export const createUser = (userData) => async (dispatch) => {
  dispatch({ type: 'CREATE_USER_REQUEST' });

  try {
    const res = await axios.post(`${BASE_URL}/api/auth/createUser`, userData, { headers });
    dispatch({ type: 'CREATE_USER_SUCCESS', payload: res.data });
    dispatch(getUsers()); 
        return { success: true, message: res.data.message || 'User created successfully' };
  } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to create user';
    dispatch({
      type: 'CREATE_USER_FAILURE',
      payload: error.response?.data?.message || 'Failed to create user',
    });
        return { success: false, message: errorMsg };
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  dispatch({ type: 'UPDATE_USER_REQUEST' });

  try {
    const res = await axios.put(`${BASE_URL}/api/auth/updateuser/${id}`, userData, { headers });
    dispatch({ type: 'UPDATE_USER_SUCCESS', payload: res.data });
    dispatch(getUsers()); // refresh list
        return { success: true, message: res.data.message || 'User updated successfully' };
  } catch (error) {
              const errorMsg = error.response?.data?.message || 'Failed to update user'

    dispatch({
      type: 'UPDATE_USER_FAILURE',
      payload: error.response?.data?.message || 'Failed to update user',
    });
        return { success: false, message: errorMsg };
  }
};

export const deleteUser = (id, userData) => async (dispatch) => {
  dispatch({ type: 'DELETE_USER_REQUEST' });
  

  try {

      const token = localStorage.getItem("token"); // ✅ read fresh token
    const headers = { Authorization: `Bearer ${token}` };
    const res = await axios.delete(`${BASE_URL}/api/auth/deleteuser/${id}`, { headers });
    dispatch({ type: 'DELETE_USER_SUCCESS', payload: res.data });
    dispatch(getUsers()); // refresh list
        return { success: true, message: res.data.message };

  } catch (error) {
            const errorMsg = error.response?.data?.message || 'Failed to create user';

    dispatch({
      type: 'DELETE_USER_FAILURE',
      payload: error.response?.data?.message || 'Failed to update user',
    });

            return { success: false, message: errorMsg };

  }




};