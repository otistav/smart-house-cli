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
import windowSize from 'react-window-size';
import MenuItem from 'material-ui/MenuItem'


import {getCurrentPageControl, getCurrentPage} from "../actions/pages"
import {Icon} from 'react-fa'


export
const BaseControl = (props) => {
  return (
    <div style={{
      position: 'absolute',
      top: (props.item.pageControl[0].position_y-1)*props.blockWidth + 'px',
      left: (props.item.pageControl[0].position_x-1)*props.blockWidth + 'px',
      width: props.blockWidth*props.item.pageControl[0].width + 'px',
      height: props.blockWidth*props.item.pageControl[0].height + 'px'
    }}>
      {props.children}
    </div>
  )

};