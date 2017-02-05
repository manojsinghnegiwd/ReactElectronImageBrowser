// @flow
import React, { Component } from 'react';
import Home from '../components/Home/';

export default class HomePage extends Component {
  render() {
  	let {images} = this.props.mainStore;
    return (
      <Home images={images} />
    );
  }
}
