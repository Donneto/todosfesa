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
    return (<div>{data.map( item => <TodoItem itemTitle={ item.title } />)}</div>);
  }
}

export default Todos;
