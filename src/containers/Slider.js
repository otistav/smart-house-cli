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
import Slider from 'material-ui/Slider';
import SelectField from 'material-ui/SelectField';
import windowSize from 'react-window-size';
import MenuItem from 'material-ui/MenuItem';
import { socket } from '../App';
import { saveStatus } from '../actions/light';


import { getCurrentPageControl, getCurrentPage } from '../actions/pages';
import { Icon } from 'react-fa';


import { BaseControl } from '../components/BaseControl';
import houseState from '../reducers/houseState';

class MySlider extends Component {
  componentDidMount() {

  }

  getProp() {
    const func = new Function('houseState', this.props.item.propFunction);
    console.log(func(this.props.houseState));
    return func(this.props.houseState);
  }


  render() {
    return (
      <BaseControl
        blockWidth={this.props.blockWidth}
        item={this.props.item}
      >
        <Slider
          style={{ height: '100%', position: 'relative', top: '40%' }}
          max={255}
          value={this.props.houseState.bedRoomLightLevel}
          step={1}

          onChange={(event, value) => {
            console.log(value);
            socket.emit('redux', {
              id: this.props.item.id,
              payload: value,
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

)(MySlider)));
