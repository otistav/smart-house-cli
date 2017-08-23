import { combineReducers } from 'redux';
import loginForm from './login';
import authorizedUser from './authorizedUser';
import pages from './pages';
import houseState from './houseState';

export default combineReducers({
  loginForm,
  authorizedUser,
  pages,
  houseState,

});
