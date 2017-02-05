import React, {Component} from 'react';
import ImagePreview from '../Image';
var Masonry = require('react-masonry-component');


// main HomePage class
class Listing extends Component {

	constructor (props) {
		super(props);
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
		const {images} = this.props;
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