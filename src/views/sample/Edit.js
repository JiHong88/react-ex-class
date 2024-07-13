import React, { Component } from 'react';

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ''
		};
	}

	handleChange = (e) => {
		this.setState({ name: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.name) {
			const newItem = { id: Date.now(), name: this.state.name };
			this.props.addItem(newItem);
			this.setState({ name: '' });
		}
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<h2>Create Item</h2>
				<input type='text' value={this.state.name} onChange={this.handleChange} placeholder='Enter item name' />
				<button type='submit'>Add Item</button>
			</form>
		);
	}
}

export default Edit;
