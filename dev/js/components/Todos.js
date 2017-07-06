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

    return (
      <nav className="panel">
        <p className="panel-heading todosfesa-panel-heading">{this.props.todoType}</p>
        {data.map( (item,index) => <TodoItem itemTitle={ item.title } key={index}/>)}
      </nav>);
  }
}

export default Todos;
