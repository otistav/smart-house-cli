import * as constants from '../constants/actions';
import axios from 'axios';

export function getPages(pages) {
  return {
    type: constants.PAGES_RECEIVED,
    payload: pages.data,
  };
}

export function saveLightStatus(status) {
  return {
    type: 'LIGHT_STATUS_RECEIVED',
    payload: status,
  };
}


export
const dispatchPages = () => dispatch => axios.get('http://localhost:3002/pages').then((res) => {
  dispatch(getPages(res));
}).catch((err) => {
  console.log('Devices not received!!!!');
});

export function setIcons(icons) {
  return {
    type: constants.ICONS_RECEIVED,
    payload: icons.data,
  };
}

export
const getIcons = () => dispatch => axios.get('http://localhost:3002/icons').then((res) => {
  console.log('ICONS RECEIVED');
  dispatch(setIcons(res));
}).catch((err) => {
  console.log(err.message);
});

export function getPageControl(page) {
  return {
    type: constants.CURRENT_PAGE_CONTROL_RECEIVED,
    payload: page.data,
  };
}

export function getPage(page) {
  return {
    type: constants.CURRENT_PAGE_RECEIVED,
    payload: page.data,
  };
}

export
const getCurrentPage = id => (dispatch) => {
  dispatch({ type: constants.CURRENT_PAGE_IS_FETCHING });
  return axios.get(`http://localhost:3002/pages/${id}`).then((res) => {
    dispatch(getPage(res));
    // dispatch(getPageForm(res))
  }).catch((err) => {
    console.log(err);
  });
};

export
const getCurrentPageControl = id => dispatch =>
  // dispatch({type: constants.CURRENT_PAGE_CONTROL_IS_FETCHING});
  axios.get(`http://localhost:3002/getPageControls?page_id=${id}`).then((res) => {
    dispatch(getPageControl(res));
  }).catch((err) => {
    console.log(err);
  })
  ;
