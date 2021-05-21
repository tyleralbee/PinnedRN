import { combineReducers } from 'redux';

import users from './users';
import pins from './pins';

const appReducer = combineReducers({
  users,
  pins
});

export default appReducer;
