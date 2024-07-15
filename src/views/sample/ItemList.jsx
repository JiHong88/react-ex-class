import React from 'react';

class ItemList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ],
    };
  }

  handleSelect = (item) => {
    console.log('Selected item:', item);
  };

  render() {
    return (
      <div>
        <h2>Item List</h2>
        <ul>
          {this.state.items.map((item) => (
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
