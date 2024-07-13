import React, { Component } from 'react';

class UpdateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.item.name,
    };
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name) {
      const updatedItem = { ...this.props.item, name: this.state.name };
      this.props.updateItem(updatedItem);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Update Item</h2>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Enter item name"
        />
        <button type="submit">Update Item</button>
      </form>
    );
  }
}

export default UpdateItem;
