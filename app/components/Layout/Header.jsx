import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import OnEvent from 'react-onevent';

injectTapEventPlugin(); // to support onTouchTap

class Header extends Component {

	constructor (props) {
		super(props);
		this.state = {
			currentPath: props.mainStore.currentPath
		}
	}

	componentWillReceiveProps (nextProps) {
		if(nextProps.mainStore.currentPath != this.state.currentPath) {
			this.changePath(nextProps.mainStore.currentPath);
		}
	}

	handlePathChange = (e) => {
		this.changePath(e.target.value);
	}

	changePath = (path) => {
		this.setState({
			currentPath: path
		})
	}

	updatePath = (e) => {
		this.props.updatePath(e.target.value);
	}

	render(){
		const {currentPath} = this.state;
		return (
			<div>
				<Toolbar>
					<ToolbarGroup>
						<OnEvent enter={this.props.updatePath}>
							<TextField
								hintText="Browse"
								fullWidth={true}
								value={currentPath}
								onChange={this.handlePathChange}
								onBlur={this.updatePath}
							/>
						</OnEvent>
					</ToolbarGroup>
				</Toolbar>
			</div>
		)
	}
}

export default Header;