import React from 'react';
import moment from 'moment';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.setMePlease = this.setMePlease.bind(this);
  }

  setMePlease(e){
    e.preventDefault();
    this.props.onClickTodoItemHandler(this.props.id);
  }

  render() {

    const { onClickTodoItemHandler, item } = this.props;
    const { id, title, dueDate } = item;

    return(
      <a className="panel-block" onClick={onClickTodoItemHandler} data-todo-id={id}>
        <b>{title}</b> - <small className="is-left"> Due: {moment(dueDate).format('dddd, MMMM Do, YYYY')}</small>
      </a>
    );
  }
}

export default TodoItem;
