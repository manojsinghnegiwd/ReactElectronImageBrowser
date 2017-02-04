// @flow
import React, { Component } from 'react';
import Header from '../components/Layout/Header';
import MuitThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions';

class App extends Component {

  render() {

    let new_childrens = React.cloneElement(this.props.children, {...this.props, key: this.props.location.pathname});

    return (
      <MuitThemeProvider>
        <div>
          <Header {...this.props}/>
          {new_childrens}
        </div>
      </MuitThemeProvider>
    );
  }
}

function mapStateToProps (state) {
  return {
    mainStore: state.mainStore
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);