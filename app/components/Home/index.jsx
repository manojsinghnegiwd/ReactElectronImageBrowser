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
				let images = [], directories = [];
				FilterContent(files).then(values => {
					let filteredFiles = values.filter((file) => {
						return file.isDirectory || file.isImage
					}).map((file) => {
						if(file.isDirectory) {
							directories.push(file);
						} else {
							images.push(file);
						}
						return file;
					})
					this.props.updateFiles(images, directories)
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

	renderImages = (files) => {
		return files.map((file, index) => {
			return (
				<div key={index} className="item">
					<ImagePreview file={file.file} />
				</div>
			)
		})
	}

	render(){
		const {images} = this.props.mainStore;
		return (
			<div>
				<Masonry
	                className={'my-gallery-class'}
	                disableImagesLoaded={false}
	                updateOnEachImageLoad={false}
	                options={{
	                	gutter: 10
	                }}>
					{this.renderImages(images)}
	            </Masonry>
			</div>
		)
	}
}

export default Listing