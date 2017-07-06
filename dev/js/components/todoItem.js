import React from 'react';
import moment from 'moment';

class TodoItem extends React.Component {
  render() {
    return(
      <a className="panel-block">
        <b>{this.props.item.title}</b> - <small className="is-left"> Due: {moment(this.props.item.dueDate).format('dddd, MMMM Do, YYYY')}</small>
      </a>
    );
  }
}

export default TodoItem;
