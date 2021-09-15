import update from 'immutability-helper';

import {
  GET_PINS_SUCCESS,
  CREATE_PINS_SUCCESS,
  ADD_COMMENT_SUCCESS,
  SELECT_PIN
} from '../actions/pins';

const initialState = {
  pins: [],
  selectedPin: {},
};

export default (state = initialState, action) => {
  switch (action.type) {

    case SELECT_PIN: {
      console.log('select pin reducer start ')
      const { pinId } = action;
      console.log('select pin reducer pinId ', pinId)
      const pin = state.pins.find(pin => pin.id === pinId);
      console.log('select pin reducer pin ', pin)

      return { ...state, selectedPin: pin}
    }

    case CREATE_PINS_SUCCESS: {

      console.log('created pin(s) / now in reducer')
      console.log('action', action)
      const { payload } = action;
    
      const pins = [...state.pins, ...payload]
      console.log('setting pins', pins)

      return { ...state, pins: pins };
    };

    case GET_PINS_SUCCESS: {
      // console.log('getting pins')
      const { payload } = action;


      // console.log('setting payload', payload)

      return { ...state, pins: payload };

    };

    case ADD_COMMENT_SUCCESS: {

      
      console.log('in add comment reducer')
      const { comment } = action;
      console.log('comment in reducer : ', comment)

      const pinIdx = state.pins.findIndex(pin => pin.id === comment.pinId);

      console.log('pinIdx in reducer : ', pinIdx)

      if (pinIdx === -1) {
        return state
      }



      return update(state, {
        pins: {
          [pinIdx]: { 
            comments: {
              $push: [{ value: comment.value, id: comment.id, pinId: comment.pinId }]
            } 
          },
        },
      })
    };


    default:
      return state;
  }
};
