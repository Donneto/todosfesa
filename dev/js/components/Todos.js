import React from 'react';
import TodoItem from './TodoItem';

class Todos extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { onClickTodoItemHandler } = this.props;

    return (
      <nav className="panel">
        <p className="panel-heading todosfesa-panel-heading">{ this.props.todoType }</p>
        { this.props.todos.map( (item, index) => item.status === this.props.todoType ? <TodoItem item={ item } key={index} onClickTodoItemHandler={onClickTodoItemHandler} /> : null)}
      </nav>);
  }
}

export default Todos;
