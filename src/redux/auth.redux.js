import axios from 'axios';
// reducer定义
const initialState = {
  isAuth: false,
  user: '',
  age: ''
};
export const authReducer =  (state = initialState, action) => {
  let newState = state;
  let payload = action.payload;
  switch(action.type) {
    case 'LOGIN': 
    newState = {...state, isAuth: true};
    break;
    case 'LOGOUT':
    newState = {...state, isAuth: false};
    break;
    case 'GET_DATA':
    newState = {...state, ...payload};
    break;
    default:
    break;
  }
  return newState;
}

export const getData = () => (
  dispatch => {
    axios.get('/data').then((res) => {
      if(res.status === 200) {
        dispatch({
          type: 'GET_DATA',
          payload: res.data
        });
      }
    });
  } 
);

export const authAction = (type, payload) => {
  return {
    type: type,
    payload: payload
  }
}
