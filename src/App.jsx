import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Router from './Router';
import './App.css';
import ToastTemplate from './components/ToastTemplate';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				{/* toast */}
				<div id='_toast'>
					<ToastTemplate></ToastTemplate>
				</div>
				{/* router */}
				<Router />
			</React.Fragment>
		);
	}
}

export default App;
