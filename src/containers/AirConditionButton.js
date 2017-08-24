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
import '../styles/airButton.css';


import { getCurrentPageControl, getCurrentPage } from '../actions/pages';
import { Icon } from 'react-fa';

import { BaseControl } from '../components/BaseControl';
import { socket } from '../App';

class AirConditionButton extends Component {
  getProp() {
    const func = new Function('houseState', this.props.item.propFunction);
    return func(this.props.houseState);
  }
  getIconSize(width) {
    if (width >= 85 && width <= 122) return 1;
    if (width > 122 && width <= 170) return 2;
    if (width > 170 && width <= 200) return 3;
    if (width > 200 && width <= 250) return 4;
    return 5;
  }

  render() {
    return (
      <BaseControl
        blockWidth={this.props.blockWidth}
        item={this.props.item}
      >
        <div className="hey" style={{ border: '1px solid blue', position: 'relative', width: '100%', height: '100%' }}>
          <FlatButton
            label="+"
            icon={<FontAwesome name="thermometer" />}
            style={{ width: '30%',
              height: '100%',
              position: 'absolute',
              top: '0',
              right: '0',
              border: 'blue solid 1px' }}
            onClick={() => {
              socket.emit('redux', {
                id: this.props.item.id,
                event: 'increase',
              });
            }}
          />
          <FlatButton
            label={(this.getProp().airStatus) ? this.getProp().deg : 'off'}
            icon={<FontAwesome name="thermometer" />}
            style={{ width: '40%',
              height: '100%',
              top: '0',
              right: '30%',
              position: 'absolute' }}
            onClick={() => {
              socket.emit('redux', {
                id: this.props.item.id,
                event: 'switch',
              });
            }}
          />
          <FlatButton
            label="-"
            icon={<FontAwesome name="thermometer" />}
            style={{ width: '30%',
              position: 'absolute',
              top: '0',
              left: '0',
              height: '100%' }}
            onClick={() => {
              socket.emit('redux', {
                id: this.props.item.id,
                event: 'decrease',
              });
            }}
          />
          {/* <div className="hey" */}
          {/* style={{ fontSize: (this.getProp() > 0) ? 'medium' : 'small%', */}
          {/* }} */}
          {/* > */}
          {/* {this.getProp()} */}
          {/* </div> */}
        </div>
      </BaseControl>
    );
  }
}

export default windowSize(withRouter(connect(
  state => ({
    houseState: state.houseState,
  }),
  dispatch => ({


  }),

)(AirConditionButton)));
