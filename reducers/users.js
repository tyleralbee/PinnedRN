import update from 'immutability-helper';

import { BECOME_USER_SUCCESS } from '../actions/users';

const initialState = {
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BECOME_USER_SUCCESS: {
      const { payload } = action;

      return { ...state, currentUser: payload };
    }

    default:
      return state;
  }
};
