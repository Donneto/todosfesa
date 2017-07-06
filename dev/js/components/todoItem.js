import React from 'react';

class TodoItem extends React.Component {
  render() {
    return(
        <a className="panel-block">
            {this.props.itemTitle}
        </a>
    );
  }
}

export default TodoItem;
