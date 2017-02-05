import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {calculateAspectRatioFit} from '../../utils/FileUtils'

class BigImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 0,
			height: 0
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.image.path != '' && nextProps.image.path !== this.props.image.path) {
			this.updateDim(nextProps.image.path)
		}
	}

	componentDidMount () {
		this.updateDim(this.props.image.path);
	}

	updateDim = (src) => {
		let img = new window.Image();
		let _this = this;

		img.onload = function () {

			let {width, height} = this;

			let greater_side = width > height ? width : height;

			let dimension = greater_side > 400 ? 720 : 400;

			let new_dimensions = calculateAspectRatioFit(width, height, dimension, dimension);

			_this.setState({...new_dimensions})
		}

		img.src = src;
	}

	render() {
		const {image} = this.props;
		return (
			<img className="big-image" {...this.state} src={image.path}/>
		)
	}
}

export default class ImageDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		}
	}

	handleClose = () => {
		this.props.onClose()
	}

	render () {
		const {image, open} = this.props;
		const actions = [
	      <FlatButton
	        label="Close"
	        primary={true}
	        onTouchTap={this.handleClose}
	      />
	    ];
		return (
			<Dialog
				className="dialog-container"
				title={image.filename}
				modal={false}
				open={open}
				onRequestClose={this.handleClose}
				autoScrollBodyContent={true}
				actions={actions}
				>
				<BigImage image={image} />
			</Dialog>
		)
	}
}