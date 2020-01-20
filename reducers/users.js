import update from 'immutability-helper';

import { BECOME_USER_SUCCESS } from '../actions/users';

const initialState = {
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BECOME_USER_SUCCESS: {

      console.log('became user ')
      const { payload } = action;

      console.log('setting payload', payload)

      return { ...state, currentUser: payload };
    }

    default:
      return state;
  }
};
