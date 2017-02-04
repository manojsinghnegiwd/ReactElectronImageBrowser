import React, {Component} from 'react';
import {readDir, FilterContent} from '../../utils/FileUtils';

// main HomePage class
class Listing extends Component {

	constructor (props) {
		super(props);
	}

	componentWillReceiveProps = (nextProps) => {
		if(nextProps.mainStore.currentPath != this.props.mainStore.currentPath) {
			this.updateFiles(nextProps.mainStore.currentPath);
		}
	}

	componentDidMount () {
		this.updateFiles(this.props.mainStore.currentPath);	
	}

	updateFiles = (path) => {
		this._readDir(path, (files) => {
			if(files && files.length) {
				FilterContent(files).then(values => {
					let filteredFiles = values.filter((file) => {
						return file.isDirectory || file.isImage
					}).map((file) => {
						return file;
					})
					this.props.updateFiles(filteredFiles)
				})
			}
		});
	}

	_readDir = (path, cb) => {
		if(path) {
			readDir(path)
				.then((files) => {
					cb(files);
				})
		} else {
			cb([]);
		}
	}

	renderFiles = (files) => {
		return files.map((file, index) => {
			return <p key={index} onClick={file.isDirectory && (() => this.props.updatePath(file.file.path))}> {file.file.filename} </p>
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