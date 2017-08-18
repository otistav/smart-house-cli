import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as constants from '../constants/actions';
import { logOut } from '../actions/authorizedUser';
import { defineUser } from '../actions/authorizedUser';
import { withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { dispatchPages } from '../actions/pages';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { getIcons } from '../actions/pages';
import Menu from 'material-ui/Menu';
import SelectField from 'material-ui/SelectField';
import windowSize from 'react-window-size';
import MenuItem from 'material-ui/MenuItem';


import { getCurrentPageControl, getCurrentPage } from '../actions/pages';
import { Icon } from 'react-fa';

import { BaseControl } from '../components/BaseControl';

class AirConditionButton extends Component {
  render() {
    return (
      <BaseControl
        blockWidth={this.props.blockWidth}
        item={this.props.item}
      >
        <FlatButton
          label={this.props.label}
          icon={<FontAwesome name="thermometer" />}
          style={{ width: '100%', height: '100%', border: 'blue solid 1px' }}
        />
      </BaseControl>
    );
  }
}

export default windowSize(withRouter(connect(
  state => ({

  }),
  dispatch => ({


  }),

)(AirConditionButton)));
