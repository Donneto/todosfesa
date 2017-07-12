import React from 'react';
import ReactDom from 'react-dom';
import { getData } from './model/data';

// Components
import Todos from './components/Todos';
import TodoDetailsBox from './components/TodoDetailsBox';
import TodoNewTask from './components/TodoNewTask';

// Component Helpers
import _componentHelper from './components/helpers/TodoItem';


class Todosfesa extends React.Component {

  constructor(props) {
    super(props);

    // App State
    this.state = {
      data: [],
      selectedTodo: null,
      newTodo: null
    };

    // Binders
    this._onClickTodoItemHandler = this._onClickTodoItemHandler.bind(this);
    this._dataFiltering = this._dataFiltering.bind(this);
    this._updateData = this._updateData.bind(this);
    this._updateTodos = this._updateTodos.bind(this);
    this._updateCTodo = this._updateCTodo.bind(this);
    this._createNewTodo = this._createNewTodo.bind(this);
    this._updateNewTodo = this._updateNewTodo.bind(this);
    this._addNewTodo = this._addNewTodo.bind(this);
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

  _createNewTodo() {

    const id = `todo-${Date.now()}`;

    const newTodo = {
      id,
      title: '',
      desc: '',
      dueDate: new Date(),
      status: 'pending'
    };
    const selectedTodo = null;

    this.setState({
      selectedTodo,
      newTodo
    });
  }

  _dataFiltering(status) {
    const { data } = this.state;

    const filteredData = data.filter( todo => todo.status === status);

    return filteredData;
  }

  _updateCTodo( todo = null ) {
    let { selectedTodo } = this.state;

    selectedTodo = todo;
    this.setState({ selectedTodo });
  }

  _updateNewTodo( todo = null) {
    let { newTodo } = this.state;

    newTodo = todo;
    this.setState({ newTodo });
  }

  _addNewTodo() {
    const { newTodo } = this.state;
    const tempTodos =  [ ...this.state.data ];
    const todoIndex = _componentHelper.getItemIndex(newTodo, tempTodos);

    if (todoIndex === -1) {
      tempTodos.push(newTodo);
      this._updateData( tempTodos );
    }
    this.setState({newTodo: null});
  }

  render() {

    const { _onClickTodoItemHandler, _dataFiltering, _createNewTodo, _updateCTodo, _updateTodos, _updateNewTodo, _addNewTodo, state } = this;
    const { selectedTodo, newTodo } = state;

    return (
      <div className="columns">
        <div className="column">
          <nav className="panel">
            <a className="button is-primary" disabled={ newTodo } onClick={_createNewTodo}>+ Add Todo</a>
          </nav>
          <Todos todos={ _dataFiltering('pending') } todoType="pending" onClickTodoItemHandler={_onClickTodoItemHandler} />
          <Todos todos={ _dataFiltering('completed') } todoType="completed" onClickTodoItemHandler={_onClickTodoItemHandler} />
        </div>
        <div className="column">
          { selectedTodo && <TodoDetailsBox currentTodo={selectedTodo} updateTodo={_updateCTodo} updateTodos={_updateTodos} /> }
          { newTodo && <TodoNewTask currentTodo={newTodo} updateTodo={_updateNewTodo} updateTodos={_addNewTodo} /> }
        </div>
      </div>
    );
  }
}

ReactDom.render( <Todosfesa />, document.getElementById('root'));
