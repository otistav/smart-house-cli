import * as constants from '../constants/actions'

export default function pages(state = {}, action) {
  switch(action.type){
    case constants.PAGES_RECEIVED: {
      return {
        ...state,
        pages: action.payload
      }
    }

    case constants.CURRENT_PAGE_RECEIVED: {
      return {
        ...state,
        currentPage: action.payload
      }
    }

    case constants.CURRENT_PAGE_CONTROL_RECEIVED: {
      return {
        ...state,
        currentPageControl: action.payload
      }
    }
    case constants.ICONS_RECEIVED: {
      return {
        ...state,
        icons: action.payload,
      }
    }
    default: return state;
  }


}