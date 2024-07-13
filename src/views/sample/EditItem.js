import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class EditItem extends Component {
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
			<Form onSubmit={this.handleSubmit}>
				<h2>Create Item</h2>
				<input type='text' value={this.state.name} onChange={this.handleChange} placeholder='Enter item name' />
				<Button type='submit'>Add Item</Button>
			</Form>
		);
	}
}

export default EditItem;
