import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { getState } from '../actions/pages';
import windowSize from 'react-window-size';
import { getCurrentPageControl, getCurrentPage } from '../actions/pages';
import { saveStatus } from '../actions/light';
import LightButton from './LightButton';
import SoundButton from './SoundButton';
import { socket } from '../App';
import WaterButton from './WaterButton';
import AirConditionButton from './AirConditionButton';
import MySlider from './Slider';


class Page extends Component {
  constructor() {
    super();
    this.state = {
      blockWidth: 0,
      blockHeight: 0,
      constants: {},
    };
    this.controlTypes = {
      lightButton: '84e9df41-e712-4c15-8b69-c1a4b5352245',
      soundButton: 'e01477a7-4ee6-4dbe-9796-57a7d1e34a07',
      airConditioningButton: '6f0257d4-8664-4435-8054-5d5255b67623',
      waterButton: 'cdf6533e-7ed4-4b65-87f1-83c7622d1ed3',
      slider: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380c41',
    };
  }

  selectControl(item) {
    switch (item.typeUUID) {
      case this.controlTypes.lightButton: {
        return <LightButton label={item.name} item={item} blockWidth={this.state.blockWidth} />;
      }
      case this.controlTypes.airConditioningButton: {
        return (<AirConditionButton
          label={item.name}
          item={item}
          blockWidth={this.state.blockWidth}
        />);
      }
      case this.controlTypes.soundButton: {
        return <SoundButton label={item.name} item={item} blockWidth={this.state.blockWidth} />;
      }
      case this.controlTypes.waterButton: {
        return <WaterButton label={item.name} item={item} blockWidth={this.state.blockWidth} />;
      }
      case this.controlTypes.slider: {
        return <MySlider label={item.name} item={item} blockWidth={this.state.blockWidth} />;
      }
      default: return null;
    }
  }


  componentDidMount() {
    // this.props.getState();
    socket.emit('redux', { storeReq: true })
    socket.on('redux', (data) => {
      console.log("this is data data",data);
      this.props.saveStatus(data);
    });
    this.props.getCurrentPageControl(this.props.match.params.id);
    this.props.getCurrentPage(this.props.match.params.id).then(() => {
      this.setState({
        blockWidth: this.props.windowWidth / this.props.currentPage.width,
        blockHeight: this.props.windowHeight / this.props.currentPage.height,
      });
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.windowWidth !== this.props.windowWidth && this.props.currentPage !== undefined) {
      this.setState({
        blockWidth: this.props.windowWidth / this.props.currentPage.width,
        blockHeight: this.props.windowHeight / this.props.currentPage.height,
      });
    }
  }


  render() {
    console.log(this.props.houseState);
    const { match, location, history } = this.props;
    return (
      <div>
        {this.props.currentPage === undefined ? null :
          <MuiThemeProvider>

          <div style={{ position: 'relative', height: `${this.props.currentPage.height * this.state.blockWidth}px` }}>
              {this.props.currentPageControl === undefined ? null :
                this.props.currentPageControl.map(item => this.selectControl(item),

                )}
            </div>
        </MuiThemeProvider>
        }
      </div>

    );
  }
}

export default windowSize(withRouter(connect(
  state => ({
    pages: state.pages.pages,
    icons: state.pages.icons,
    houseState: state.houseState,
    currentPage: state.pages.currentPage,
    currentPageControl: state.pages.currentPageControl,
  }),
  dispatch => ({
    getState: () => dispatch(getState()),
    getCurrentPageControl: id => dispatch(getCurrentPageControl(id)),
    getCurrentPage: id => dispatch(getCurrentPage(id)),
    saveStatus: (status) => {
      dispatch(saveStatus(status));
    },

  }),

)(Page)));
