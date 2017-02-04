import React, {Component} from 'react';
import {readDir} from '../../utils/FileUtils';

// main HomePage class
class Listing extends Component {

	constructor (props) {
		super(props);
	}

	componentDidMount () {
		readDir('/home/manoj/Documents')
			.then((files) => {
				console.log(files)
				this.props.updateFiles(files);
			})
	}

	renderFiles = (files) => {
		return files.map((file, index) => {
			return <p key={index}> {file} </p>
		})
	}

	render(){
		const {files, currentPath} = this.props.mainStore;
		return (
			<div>
				{this.renderFiles(files)}
			</div>
		)
	}
}

export default Listing