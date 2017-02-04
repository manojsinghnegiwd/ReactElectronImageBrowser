import React, {Component} from 'react';
import {readDir, FilterContent} from '../../utils/FileUtils';
import ImagePreview from '../Image';
import Paper from 'material-ui/Paper';
var Masonry = require('react-masonry-component');

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};


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
			return (
				<div key={index} style={{float: 'left', width: '25%'}}>
					{file.isDirectory ? 
						<Paper onClick={() => this.props.updatePath(file.file.path)} style={style} zDepth={1}>
							<div>
								{file.file.filename}
							</div>
						</Paper>
					: 	<ImagePreview file={file.file} />
					}
				</div>
			)
		})
	}

	render(){
		const {files, currentPath} = this.props.mainStore;
		return (
			<div>
				<Masonry
	                className={'my-gallery-class'}
	                disableImagesLoaded={false}
	                updateOnEachImageLoad={false}>
					{this.renderFiles(files)}
	            </Masonry>
			</div>
		)
	}
}

export default Listing