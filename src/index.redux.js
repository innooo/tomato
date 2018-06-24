// reducer定义
export function counter(state = 0, action) {
  let newState = state;
  switch(action.type) {
    case 'ADD': 
    newState = state + 1;
    break;
    case 'MINUS':
    newState = state - 1;
    break;
    default:
    break;
  }
  return newState;
}

// action creator
export function action(type, data) {
  return {
    type: type,
    data: data
  }
}

// async action creator
export function asyncAction(type, data) {
  return dispatch => {
    setTimeout(() => {
      dispatch(action(type, data));
    }, 2000);
  }
}
