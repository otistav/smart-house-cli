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
import { saveStatus } from '../actions/light';


import { getCurrentPageControl, getCurrentPage } from '../actions/pages';
import { Icon } from 'react-fa';


import { BaseControl } from '../components/BaseControl';
import houseState from '../reducers/houseState';

class LightButton extends Component {
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
    console.log('this is icon size', this.getIconSize());
    console.log('this is block width', this.props.blockWidth);
    return (
      <BaseControl
        blockWidth={this.props.blockWidth}
        item={this.props.item}
      >
        <FlatButton
          icon={
            <div className="f">
              <FontAwesome
                style={{
                  color: (this.getProp()) ? 'yellow' : 'initial' }}
                name="lightbulb-o"
                size={`${this.getIconSize(this.props.blockWidth)}x`}
              /><br />
              {this.props.label}
            </div>

          }
          style={{
            width: '100%',
            height: '100%',
            border: 'yellow 1px solid',
          }}

          onClick={() => {
            socket.emit('redux', {
              id: this.props.item.id,
            });
          }}
        />
      </BaseControl>
    );
  }
}

export default windowSize(withRouter(connect(
  state => ({
    houseState: state.houseState,
  }),
  dispatch => ({
    saveStatus: (status) => {
      dispatch(saveStatus(status));
    },


  }),

)(LightButton)));
