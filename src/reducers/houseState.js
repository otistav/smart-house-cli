import * as constants from '../constants/actions';

export default function houseState(state = {}, action) {
  switch (action.type) {
    case 'STATE_REFRESHED': {
      return Object.assign({}, state, action.payload);
    }
    default: return state;
  }
}
