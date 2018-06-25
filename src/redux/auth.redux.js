// reducer定义
export const authReducer =  (state = {isAuth: false, user: 'aaa'}, action) => {
  let newState = state;
  switch(action.type) {
    case 'LOGIN': 
    newState = {...state, isAuth: true};
    break;
    case 'LOGOUT':
    newState = {...state, isAuth: false};
    break;
    default:
    break;
  }
  return newState;
}

export const authAction = (type, data) => {
  return {
    type: type,
    data: data
  }
}
