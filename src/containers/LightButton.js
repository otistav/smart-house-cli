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
import { socket } from '../App';
import { saveLightStatus } from '../actions/light';


import { getCurrentPageControl, getCurrentPage } from '../actions/pages';
import { Icon } from 'react-fa';

import { BaseControl } from '../components/BaseControl';

class LightButton extends Component {
  componentDidMount() {
    socket.on('light', (data) => {
      console.log(data);
      this.props.saveLightStatus(data);
    });
  }

  render() {
    return (
      <BaseControl
        blockWidth={this.props.blockWidth}
        item={this.props.item}
      >
        <FlatButton
          label={this.props.label}
          style={{ width: '100%',
            height: '100%',
            border: 'yellow 1px solid',
            backgroundColor: (this.props.lightState) ? 'yellow' : 'white' }}
          icon={<FontAwesome name="lightbulb-o" />}
          onClick={() => {
            socket.emit('light', {
              status: !this.props.lightState,
              type: 'LIGHT_SWITCHED',
            });
          }}
        />
      </BaseControl>
    );
  }
}

export default windowSize(withRouter(connect(
  state => ({
    lightState: state.houseState.lightState.lightState,
  }),
  dispatch => ({
    saveLightStatus: (status) => {
      dispatch(saveLightStatus(status));
    },


  }),

)(LightButton)));
