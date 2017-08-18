import * as constants from '../constants/actions';

export default function houseState(state = { lightState: { lightState: false } }, action) {
  switch (action.type) {
    case 'LIGHT_STATUS_RECEIVED': {
      return {
        lightState: action.payload,
      };
    }
    default: return state;
  }
}
