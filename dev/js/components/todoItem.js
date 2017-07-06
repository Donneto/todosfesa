import React from 'react';

class TodoItem extends React.Component {
  render() {
    return(
      <a className="button">{this.props.itemTitle}</a>
    );
  }
}

export default TodoItem;
