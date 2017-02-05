import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import AutoComplete from 'material-ui/AutoComplete';
import OnEvent from 'react-onevent';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import {List, ListItem} from 'material-ui/List';
import ImageDialog from '../ImageDialog';


injectTapEventPlugin(); // to support onTouchTap

class Header extends Component {

	constructor (props) {
		super(props);
		this.state = {
			currentPath: props.mainStore.currentPath,
			dataSource: [],
			open: false,
			openDialog: false
		}
	}

	componentWillReceiveProps (nextProps) {
		if(nextProps.mainStore.currentPath != this.state.currentPath) {
			this.changePath(nextProps.mainStore.currentPath);
		}

		if(nextProps.mainStore.currentImage && nextProps.mainStore.currentImage.path != '' && nextProps.mainStore.currentImage.path != this.props.mainStore.currentImage.path) {
			this.openDialog();
		}
	}

	changePath = (path) => {
		this.setState({
			currentPath: path
		})
	}

	updatePath = (e) => {
		this.props.updatePath(e.target.value);
	}

	toggleDrawer = () => {
		this.setState((prevState) => ({
			open: !prevState.open
		}))
	}

	closeDialog = () => {
		this.props.emptyImage();
		this.setState({
			openDialog: false
		})
	}

	openDialog = () => {
		this.setState({
			openDialog: true
		})
	}

	updateImageByIndex = (index) => {
		let {images} = this.props.mainStore;
		let firstIndex = (index === 0);
		let lastIndex = (index == images.length - 1);
		let {path, filename} = images[index];
		this.props.updateImage(path, filename, index, lastIndex, firstIndex);
	}

	renderDirs = (dirs) => {
		return dirs.map((dir, index) => {
			return <ListItem onClick={() => this.props.updatePath(dir.path)} key={index} primaryText={dir.filename} leftIcon={<FolderIcon />} />
		})
	}

	render(){
		const {currentPath, open, openDialog} = this.state;
		const {directories, currentImage} = this.props.mainStore;
		return (
			<div className="header">
				<Toolbar>
					<ToolbarGroup>
						<FlatButton label="Files" onClick={this.toggleDrawer} />
					</ToolbarGroup>
					<ToolbarGroup>
						<OnEvent enter={this.props.updatePath}>
							<AutoComplete
								hintText="Type anything"
								dataSource={this.state.dataSource}
								searchText={currentPath}
								onUpdateInput={e => this.changePath(e)}
								onBlur={this.updatePath}
							/>
						</OnEvent>
					</ToolbarGroup>
				</Toolbar>
				<Drawer docked={false} onRequestChange={(open) => this.setState({open})} open={open}>
					<List>
						{this.renderDirs(directories)}
					</List>
				</Drawer>
				<ImageDialog onNavigation={this.updateImageByIndex} onClose={this.closeDialog} open={openDialog} image={currentImage} />
			</div>
		)
	}
}

export default Header;