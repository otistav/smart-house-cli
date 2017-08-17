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
import LightButton from "./LightButton";
import SoundButton from './SoundButton'
import WaterButton from './WaterButton'
import AirConditionButton from './AirConditionButton'



class Page extends Component{
  constructor() {
    super();
    this.state = {
      blockWidth: 0,
      blockHeight: 0,
      constants: {}
    };
    this.controlTypes = {
      lightButton: '84e9df41-e712-4c15-8b69-c1a4b5352245',
      soundButton: 'e01477a7-4ee6-4dbe-9796-57a7d1e34a07',
      airConditioningButton: '6f0257d4-8664-4435-8054-5d5255b67623',
      waterButton: 'cdf6533e-7ed4-4b65-87f1-83c7622d1ed3'
    }
  }

  selectControl(item) {
      switch (item.typeUUID) {
        case this.controlTypes.lightButton: {
          return <LightButton label={item.name} item={item}  blockWidth={this.state.blockWidth}/>
        }
        case this.controlTypes.airConditioningButton: {
          return <AirConditionButton label={item.name} item={item}  blockWidth={this.state.blockWidth}/>
        }
        case this.controlTypes.soundButton: {
          return <SoundButton label={item.name} item={item}  blockWidth={this.state.blockWidth}/>
        }
        case this.controlTypes.waterButton: {
          return <WaterButton label={item.name} item={item}  blockWidth={this.state.blockWidth}/>
        }

    }
  }


  componentDidMount() {
    this.props.getCurrentPageControl(this.props.match.params.id).then(() => {
      this.setState({

      })
    });
    this.props.getCurrentPage(this.props.match.params.id).then(() => {
      this.setState({
        blockWidth: this.props.windowWidth/this.props.currentPage.width,
        blockHeight: this.props.windowHeight/this.props.currentPage.height
      })
    })

  }
  componentDidUpdate(prevProps) {
    if (prevProps.windowWidth !== this.props.windowWidth && this.props.currentPage !== undefined)
      this.setState({
        blockWidth: this.props.windowWidth/this.props.currentPage.width,
        blockHeight: this.props.windowHeight/this.props.currentPage.height
      })
  }


  render() {
    const {match, location, history} = this.props;
    return (
      <div>
      {this.props.currentPage === undefined ? null :
        <MuiThemeProvider>

          <div style={{position: 'relative', height: this.props.currentPage.height*this.state.blockWidth + 'px'}}>
            {this.props.currentPageControl === undefined ? null :
              this.props.currentPageControl.map((item) =>
                {
                  return this.selectControl(item)
                }

              )}
          </div>
        </MuiThemeProvider>
      }
      </div>

    )
  }
}

export default windowSize(withRouter(connect(
  state => ({
    pages: state.pages.pages,
    icons: state.pages.icons,
    currentPage: state.pages.currentPage,
    currentPageControl: state.pages.currentPageControl
  }),
  dispatch => ({
    getCurrentPageControl: (id) => {
      return dispatch(getCurrentPageControl(id))
    },
    getCurrentPage: (id) => {
      return dispatch(getCurrentPage(id))
    }

  })

)(Page)));