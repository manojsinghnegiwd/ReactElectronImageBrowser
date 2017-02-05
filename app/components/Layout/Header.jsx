import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import AutoComplete from 'material-ui/AutoComplete';
import OnEvent from 'react-onevent';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import {List, ListItem} from 'material-ui/List';


injectTapEventPlugin(); // to support onTouchTap

class Header extends Component {

	constructor (props) {
		super(props);
		this.state = {
			currentPath: props.mainStore.currentPath,
			dataSource: [],
			open: false
		}
	}

	componentWillReceiveProps (nextProps) {
		if(nextProps.mainStore.currentPath != this.state.currentPath) {
			this.changePath(nextProps.mainStore.currentPath);
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

	renderDirs = (dirs) => {
		return dirs.map((dir, index) => {
			return <ListItem onClick={() => this.props.updatePath(dir.file.path)} key={index} primaryText={dir.file.filename} leftIcon={<FolderIcon />} />
		})
	}

	render(){
		const {currentPath, open} = this.state;
		const {directories} = this.props.mainStore;
		return (
			<div>
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
			</div>
		)
	}
}

export default Header;