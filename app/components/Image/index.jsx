import React, {Component} from 'react';

export default class ImagePreview extends Component {
	constructor(props) {
		super(props);
	}

	_onClick = () => {
		let {file} = this.props;
		this.props.updateImage(file.path, file.filename);
	}


	render () {
		const {file} = this.props;
		return (
			<img onClick={this._onClick} style={{width: '100%'}} src={file.path}  />
		)
	}
}