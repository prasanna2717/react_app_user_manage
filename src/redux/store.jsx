import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { authReducer,userReducer } from './auth/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
    userList: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
