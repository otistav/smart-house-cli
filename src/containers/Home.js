import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { dispatchPages, getIcons } from '../actions/pages';
import {
  Link,
  withRouter,
} from 'react-router-dom';

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      receivedMessage: '',
    };
  }


  componentDidMount() {
    this.props.getPages();
    this.props.getIcons();
  }

  getPageIcon(iconID) {
    for (let i = 0; i < this.props.icons.length; i++) {
      if (iconID !== this.props.icons[i].id) {
        return this.props.icons[i].path;
      }
    }
    return null;
  }

  render() {
    const { match, location, history } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          {
            this.props.pages === undefined ? null :
              this.props.pages.map((item, value) =>
                (<FlatButton
                  label={item.caption}
                  icon={<FontAwesome name={this.getPageIcon(item.iconID)} />}
                  style={{ width: '100%', height: '50px' }}
                  containerElement={<Link to={`/home/${item.id}`} />}
                />))

          }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(connect(
  state => ({
    pages: state.pages.pages,
    icons: state.pages.icons,
  }),
  dispatch => ({
    getPages: () => dispatch(dispatchPages()),
    getIcons: () => dispatch(getIcons()),

  }),

)(HomePage));
