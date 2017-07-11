import React from 'react';
import TodoItem from './TodoItem';

class Todos extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { onClickTodoItemHandler, todos, todoType } = this.props;

    return (
      <nav className="panel">
        <p className="panel-heading todosfesa-panel-heading">{todoType}</p>
        {todos.map( (item, index) => <TodoItem item={ item } key={index} onClickTodoItemHandler={onClickTodoItemHandler} />)}
      </nav>);
  }
}

export default Todos;
