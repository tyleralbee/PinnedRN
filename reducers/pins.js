import update from 'immutability-helper';

import {
  GET_PINS_SUCCESS,
  CREATE_PINS_SUCCESS
} from '../actions/pins';

const initialState = {
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {

    case CREATE_PINS_SUCCESS: {

      console.log('created pin(s) ')
      const { payload } = action;

      console.log('setting pins', [...state.arr, payload])

      return { ...state, pins: [...state.arr, payload] };
    }

    case GET_PINS_SUCCESS: {
      console.log('getting pins')
      const { payload } = action;


      console.log('setting payload', payload)

      return { ...state, pins: payload };

    }


    default:
      return state;
  }
};
