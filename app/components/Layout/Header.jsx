import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';

injectTapEventPlugin(); // to support onTouchTap

class Header extends Component {

	constructor (props) {
		super(props);
	}

	render(){
		return (
			<div>
				<AppBar title="Browse" />
			</div>
		)
	}
}

export default Header;