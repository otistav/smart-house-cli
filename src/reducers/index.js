import { combineReducers } from 'redux'
import loginForm from './login'
import authorizedUser from './authorizedUser'
import pages from './pages'

export default combineReducers({
  loginForm,
  authorizedUser,
  pages

})