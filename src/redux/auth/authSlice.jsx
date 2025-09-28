const initialState = {
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  successMsg:null
};

export const authReducer = (state = initialState, action) => {
  console.log(action,"action")
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, token: action.payload,successMsg:action.successMsg };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }

}



const userInitialState = {
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  total:0
};

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case 'GET_USERS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'GET_USERS_SUCCESS':
      return { ...state, loading: false, users: action.payload,total:action.total };
    case 'GET_USERS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createuser = (state = userInitialState, action) => {
  switch (action.type) {

    case 'CREATE_USER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'CREATE_USER_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_USER_FAILURE':
      return { ...state, loading: false, error: action.payload };
  }
}


export const edituser = (state = userInitialState, action) => {
  switch (action.type) {


    case 'UPDATE_USER_REQUEST':
      return { ...state, loading: true };
    case 'UPDATE_USER_SUCCESS':
      return { ...state, loading: false };
    case 'UPDATE_USER_FAILURE':
      return { ...state, loading: false, error: action.payload };
  }
}



export const deleteUser = (state = userInitialState, action) => {
  switch (action.type) {
    case 'DELETE_USER_REQUEST':
      return { ...state, loading: true };
    case 'DELETE_USER_SUCCESS':
      return { ...state, loading: false };
    case 'DELETE_USER_FAILURE':
      return { ...state, loading: false, error: action.payload };
  }
}