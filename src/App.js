import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar'
import {connect} from 'react-redux'
import * as constants from './constants/actions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import './App.css';
import LoginPage from './containers/Login'
import {saveUser} from "./actions/authorizedUser"
import FlatButton from 'material-ui/FlatButton'
import {defineUser} from "./actions/authorizedUser"
import {withRouter} from 'react-router-dom'
import {logOut} from "./actions/authorizedUser"
import HomePage from './containers/Home'
import Page from './containers/Page'
import io from 'socket.io-client';

import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
export
const  socket = io.connect("http://localhost:3000");

class App extends Component {

  componentDidMount() {

  }


  componentWillMount(){
    axios.get("http://localhost:3002/findMe").then((res) => {
      this.props.saveUser(res.data)
    }).then(() => {
      this.props.defineUser(true)
    }).catch(() => {
      this.props.defineUser(false)

    });
    this.getRedirect()
  }

  getRedirect = () => {
    if (this.props.isAuth === false) {
      return(
        <Redirect to="/login"/>
      )
    }
    if ((this.props.location.pathname === '/login' || this.props.location.pathname === '/')
      && this.props.isAuth === true) {

      return (
        <Redirect to="/home"/>
      )
    }
    return null

  };
  waitingRender = () => {
    if (this.props.isAuth === undefined || this.props.user === undefined) {
      return(
        <div className="waiting">
          <div className="sk-fading-circle">
            <div className="sk-circle1 sk-circle"/>
            <div className="sk-circle2 sk-circle"/>
            <div className="sk-circle3 sk-circle"/>
            <div className="sk-circle4 sk-circle"/>
            <div className="sk-circle5 sk-circle"/>
            <div className="sk-circle6 sk-circle"/>
            <div className="sk-circle7 sk-circle"/>
            <div className="sk-circle8 sk-circle"/>
            <div className="sk-circle9 sk-circle"/>
            <div className="sk-circle10 sk-circle"/>
            <div className="sk-circle11 sk-circle"/>
            <div className="sk-circle12 sk-circle"/>
          </div>
        </div>
      )
    }
  };

  render() {
    const {match, location, history} = this.props;

    this.waitingRender();

    return (
      <div>
        <MuiThemeProvider>
          <Router>
            <div>
              {this.props.isAuth === false ? null :
                <AppBar title="Smart House"
                        iconElementLeft={<FlatButton label="home"
                                                     containerElement={<Link to="/home/"/>}
                        />}
                        iconElementRight={<FlatButton label="log out"
                                                      onTouchTap={() => {this.props.logOut().then(() => {
                                                        this.props.history.replace('/login')
                                                      })}}

                        />}
                />
                }
              <Route path="/login" component={LoginPage}/>
              <Route exact path="/home" component={HomePage}/>
              <Route path="/home/:id" component={Page}/>
              {this.getRedirect()}

            </div>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    user: state.authorizedUser.user,
    isAuth: state.authorizedUser.authorized
  })
  ,
  dispatch => ({
    saveUser: (user) => {
      dispatch(saveUser({firstName: user.firstName, lastName: user.lastName, isAdmin: user.isAdmin}))
    },
    defineUser: (state)=> {
      dispatch(defineUser(state))
    },
    logOut: () => {
      const brokeSession = () => {

        return (dispatch) => {
          return axios.post("http://localhost:3002/logoutpage").then(() => {
            dispatch(logOut());
            dispatch(defineUser(false));

          }).catch(err => {
            dispatch({type:constants.USER_NOT_RECEIVED})
          });
        };
      };
      return dispatch(brokeSession());
    },


  })



)(App));
