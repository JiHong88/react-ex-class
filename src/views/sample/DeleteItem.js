import React from 'react';
import { Button } from 'react-bootstrap';

class DeleteItem extends React.Component {
	handleDelete = () => {
		this.props.deleteItem(this.props.id);
	};

	render() {
		return (
			<div>
				<h2>Delete Item</h2>
				<Button onClick={this.handleDelete}>Delete</Button>
			</div>
		);
	}
}

export default DeleteItem;
