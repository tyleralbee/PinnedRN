import update from 'immutability-helper';

import {
  GET_PINS_SUCCESS,
  CREATE_PINS_SUCCESS
} from '../actions/pins';

const initialState = {
  pins: [],
};

export default (state = initialState, action) => {
  switch (action.type) {

    case CREATE_PINS_SUCCESS: {

      console.log('created pin(s) ')
      console.log('action', action)
      const { payload } = action;
    
      const pins = [...state.pins, ...payload]
      console.log('setting pins', pins)

      return { ...state, pins: pins };
    }

    case GET_PINS_SUCCESS: {
      // console.log('getting pins')
      const { payload } = action;


      // console.log('setting payload', payload)

      return { ...state, pins: payload };

    }


    default:
      return state;
  }
};
