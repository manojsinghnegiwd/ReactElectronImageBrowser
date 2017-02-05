import React, {Component} from 'react';

export default class ImagePreview extends Component {
	constructor(props) {
		super(props);
	}

	_onClick = () => {
		this.props.updateImage(this.props.file.path);
	}


	render () {
		const {file} = this.props;
		return (
			<img onClick={this._onClick} style={{width: '100%'}} src={file.path}  />
		)
	}
}