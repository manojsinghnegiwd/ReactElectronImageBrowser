import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import AutoComplete from 'material-ui/AutoComplete';
import OnEvent from 'react-onevent';

import {checkIfDir} from '../../utils/FileUtils'

injectTapEventPlugin(); // to support onTouchTap

class Header extends Component {

	constructor (props) {
		super(props);
		this.state = {
			currentPath: props.mainStore.currentPath,
			dataSource: []
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

	render(){
		const {currentPath} = this.state;
		return (
			<div>
				<Toolbar>
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
			</div>
		)
	}
}

export default Header;