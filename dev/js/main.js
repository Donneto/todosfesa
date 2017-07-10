import React from 'react';
import ReactDom from 'react-dom';

// Object.assign(window, {React, ReactDom});

import Todos from './components/Todos';
import TodoDetailsBox from './components/TodoDetailsBox';
import { getData } from './model/data';

class Todosfesa extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedTodo: null
    };

    this._onClickTodoItemHandler = this._onClickTodoItemHandler.bind(this);
    this._updateData = this._updateData.bind(this);
    this._updateTodos = this._updateTodos.bind(this);
    this._updateCTodo = this._updateCTodo.bind(this);
  }

  // React Lifecycle Components
  componentWillMount() {

    this._updateData( getData('todos') );
  }

  componentDidMount() {
    if (this.state.data.length) {
      this._updateCTodo(this.state.data[0]);
    }
  }

  // Custom Implementations

  _onClickTodoItemHandler( item ) {

    let sTodo = this.state.selectedTodo;

    sTodo = item;
    this.setState({ selectedTodo: sTodo });
  }

  _updateData( todos = []) {

    let tempState = [...this.state.data];

    tempState = todos;
    this.setState({ data: tempState });
  }

  _updateTodos() {
    const { data, selectedTodo } = this.state;
    const tempTodos =  [ ...data ];
    const todoIndex = tempTodos.findIndex( element  => selectedTodo.id === element.id);

    if (todoIndex !== -1) {
      tempTodos[todoIndex] = selectedTodo;
      this._updateData( tempTodos );
    }
  }

  _updateCTodo( todo = null ) {
    let sTodo = this.state.selectedTodo;

    sTodo = todo;
    this.setState({ selectedTodo: sTodo });
  }

  render() {

    return (
      <div className="columns">
        <div className="column">
          <Todos todos={this.state.data} todoType="pending" onClickTodoItemHandler={this._onClickTodoItemHandler} />
          <Todos todos={this.state.data} todoType="completed" onClickTodoItemHandler={this._onClickTodoItemHandler} />
        </div>
        <div className="column">
          {this.state.selectedTodo && <TodoDetailsBox currentTodo={ this.state.selectedTodo } updateTodo={ this._updateCTodo} updateTodos={ this._updateTodos } />}
        </div>
      </div>
    );
  }
}

ReactDom.render( <Todosfesa />, document.getElementById('root'));
