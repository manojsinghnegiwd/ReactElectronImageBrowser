import React, {Component} from 'react';

export default class ImagePreview extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		const {file} = this.props;
		return (
			<img style={{margin: 20, width: '100%'}} src={file.path}  />
		)
	}
}