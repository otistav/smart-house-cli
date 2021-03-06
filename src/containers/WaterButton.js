import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as constants from '../constants/actions'
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


import {BaseControl} from "../components/BaseControl"

class WaterButton extends Component {
  render() {
    return (
      <BaseControl
        blockWidth={this.props.blockWidth}
        item={this.props.item}
      >
        <FlatButton label={this.props.label}
                    style={{width: '100%', height: '100%',border: 'aqua 1px solid'}}
                    icon={<FontAwesome name='bath'/>}
        />
      </BaseControl>
    )
  }
}

export default windowSize(withRouter(connect(
  state => ({

  }),
  dispatch => ({


  })

)(WaterButton)));