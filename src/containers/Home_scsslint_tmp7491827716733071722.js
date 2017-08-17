import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as constants from '../constants/actions'
import {logOut} from "../actions/authorizedUser"
import {defineUser} from "../actions/authorizedUser"
import {withRouter} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import {dispatchPages} from "../actions/pages"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {getIcons} from "../actions/pages"
import Menu from 'material-ui/Menu'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'


import {Icon} from 'react-fa'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'



// <button onClick={() => {this.props.logOut()}>LOGOUT</button>
class HomePage extends Component{

  getPageIcon(iconID) {
    for (let i = 0; i < this.props.icons.length; i++) {
      if (iconID !== this.props.icons[i].id) {
      } else {
        console.log("THIS IS PAAAAAAAATH!!!!!!", this.props.icons[i].path);
        return this.props.icons[i].path
      }
    }

  }

  componentDidMount() {
    this.props.getPages();
    this.props.getIcons();
  }

  render() {
    const {match, location, history} = this.props;
    return (
      <MuiThemeProvider>
        <div>
          {
            this.props.pages === undefined ? null :
                  this.props.pages.map((item, value) =>
                    <FlatButton label={item.caption}
                                icon={<FontAwesome name={this.getPageIcon(item.iconID)}/>}
                                style={{width: '100%',height: '50px'}}
                                containerElement={<Link to={"/home/" + item.id}/>}
                    />)

          }
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(connect(
  state => ({
    pages: state.pages.pages,
    icons: state.pages.icons
  }),
  dispatch => ({
    getPages: () => {
      return dispatch(dispatchPages());
    },
    getIcons: () => {
      return dispatch(getIcons())
    },

  })

)(HomePage));