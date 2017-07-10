import React from 'react';
import ReactDom from 'react-dom';
import { getData } from './model/data';

// Components
import Todos from './components/Todos';
import TodoDetailsBox from './components/TodoDetailsBox';

// Component Helpers
import _componentHelper from './components/helpers/TodoItem';


class Todosfesa extends React.Component {

  constructor(props) {
    super(props);

    // App State
    this.state = {
      data: [],
      selectedTodo: null
    };

    // Binders
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

    let { selectedTodo } = this.state;

    selectedTodo = item;
    this.setState({ selectedTodo });
  }

  _updateData( todos = []) {

    let tempTodos = [...this.state.data];

    tempTodos = todos;
    this.setState({ data: tempTodos });
  }

  _updateTodos() {
    const { selectedTodo } = this.state;
    const tempTodos =  [ ...this.state.data ];
    const todoIndex = _componentHelper.getItemIndex(selectedTodo, tempTodos);

    if (todoIndex !== -1) {
      tempTodos[todoIndex] = selectedTodo;
      this._updateData( tempTodos );
    }
  }

  _updateCTodo( todo = null ) {
    let { selectedTodo } = this.state;

    selectedTodo = todo;
    this.setState({ selectedTodo });
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
