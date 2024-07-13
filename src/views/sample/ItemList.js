import React from 'react';

class ItemList extends React.Component {
  handleSelect = (item) => {
    this.props.setSelectedItem(item);
  };

  render() {
    return (
      <div>
        <h2>Item List</h2>
        <ul>
          {this.props.items.map((item) => (
            <li key={item.id} onClick={() => this.handleSelect(item)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ItemList;
