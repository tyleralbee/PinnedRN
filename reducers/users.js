import update from 'immutability-helper';

import {
  BECOME_USER_SUCCESS,
  ADD_FRIEND_SUCCESS,
  GET_USERS_SUCCESS
} from '../actions/users';

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

    case GET_USERS_SUCCESS: {
      console.log('getting users')
      const { payload } = action;


      console.log('setting payload', payload)

      return { ...state, users: payload };

    }

    case ADD_FRIEND_SUCCESS: {
      console.log('adding user')
      const { payload } = action;


      console.log('setting payload', payload)

      return { ...state, currentUser: { friends: state.currentUser.friends.push(payload) } };

    }


    default:
      return state;
  }
};
