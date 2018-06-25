// reducer定义
export const dashboardReducer = (state = 0, action) => {
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
export function dashboardAction(type, data) {
  return {
    type: type,
    data: data
  }
}

// async action creator
export function asyncDashboardAction(type, data) {
  return dispatch => {
    setTimeout(() => {
      dispatch(dashboardAction(type, data));
    }, 2000);
  }
}
