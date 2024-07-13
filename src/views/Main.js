import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	moveTo(pathname) {
		this.props.navigate(pathname);
	}

	render() {
		return (
			<>
				<Button variant='primary' onClick={() => this.moveTo('/sample/edit')}>
					Edit
				</Button>
			</>
		);
	}
}

export default Main;
