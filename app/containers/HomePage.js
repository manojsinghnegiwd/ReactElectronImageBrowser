// @flow
import React, { Component } from 'react';
import Home from '../components/Home/';

export default class HomePage extends Component {
  render() {
  	let {images} = this.props.mainStore;
    return (
      <Home images={images} emptyImage={this.props.emptyImage} updateImage={this.props.updateImage} onImageClick={this.props.updateImage} />
    );
  }
}
