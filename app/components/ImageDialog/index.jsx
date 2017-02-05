import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
		return (
			<Dialog
				title={image.filename}
				modal={false}
				open={open}
				onRequestClose={this.handleClose}
				>
			<img src={image.path}/>
			</Dialog>
		)
	}
}