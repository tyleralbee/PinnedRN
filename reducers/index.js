import { combineReducers } from 'redux';

import users from './users';

const appReducer = combineReducers({
  users,
});

export default appReducer;
