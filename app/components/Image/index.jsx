import React, {Component} from 'react';

export default class ImagePreview extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		const {file} = this.props;
		return (
			<img style={{width: '100%'}} src={file.path}  />
		)
	}
}