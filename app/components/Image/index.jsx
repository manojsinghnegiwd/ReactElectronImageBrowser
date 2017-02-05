import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class ImagePreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		}
	}

	_onClick = () => {
		let {file} = this.props;
		this.props.updateImage(file.path, file.filename);
	}


	render () {
		const {file} = this.props;
		const {loading} = this.state;
		return (
			<div>
				{ loading ? <CircularProgress /> : null}
				<img onLoad={e => this.setState({loading: false})} onClick={this._onClick} style={{display: (loading ? 'none' : 'block'),width: '100%'}} src={file.path}  />
			</div>
		)
	}
}