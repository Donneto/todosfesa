import React from 'react';
import TodoItem from './TodoItem';

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.data = [];
  }

  componentWillMount() {
    this.data = this.props.todos.filter( item => item.status === this.props.todoType );
  }

  render() {

    const data = this.data;
    const { onClickTodoItemHandler } = this.props;

    return (
      <nav className="panel">
        <p className="panel-heading todosfesa-panel-heading">{this.props.todoType}</p>
        {data.map( (item, index) => <TodoItem item={ item } key={index} onClickTodoItemHandler={onClickTodoItemHandler} />)}
      </nav>);
  }
}

export default Todos;
