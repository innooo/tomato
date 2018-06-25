import { combineReducers } from 'redux';

import { dashboardReducer } from './dashboard.redux';
import { authReducer } from './auth.redux';

export default combineReducers({ dashboardReducer, authReducer });