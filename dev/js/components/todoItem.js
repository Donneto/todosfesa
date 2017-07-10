import React from 'react';
import moment from 'moment';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.setMePlease = this.setMePlease.bind(this);
  }

  setMePlease(e) {
    e.preventDefault();

    this.props.onClickTodoItemHandler(this.props.item);
  }

  render() {

    return(
      <a className="panel-block" onClick={ (e) => this.setMePlease(e) } >
        <b>{this.props.item.title}</b> - <small className="is-left"> Due: {moment(this.props.item.dueDate).format('dddd, MMMM Do, YYYY')}</small>
      </a>
    );
  }
}

export default TodoItem;
