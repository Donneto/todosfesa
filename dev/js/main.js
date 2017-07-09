import React from 'react';
import ReactDom from 'react-dom';

// Object.assign(window, {React, ReactDom});

import Todos from './components/Todos';
import TodoDetailsBox from './components/TodoDetailsBox';
import { getData, setData } from './model/data';

class Todosfesa extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedTodo: null
    };
    this._onClickTodoItemHandler = this._onClickTodoItemHandler.bind(this);
    this._updateTodo = this._updateTodo.bind(this);
    this._dataFiltering = this._dataFiltering.bind(this);
  }

  componentWillMount() {

    let tempData = [ ...this.state.data ];

    tempData = getData('todos');
    this.setState({ data: tempData });

    // setData('todos',
    //   [{
    //     id: 'todo1',
    //     title: 'oa',
    //     desc: 'localStorage',
    //     dueDate: new Date('07/08/2017'),
    //     status: 'pending'
    //   },
    //   {
    //     id: 'todo2',
    //     title: 'oa2',
    //     desc: 'localStorage2',
    //     dueDate: new Date('07/09/2017'),
    //     status: 'completed'
    //   }]
    // );
  }

  _onClickTodoItemHandler(id) {

    this.setState({ selectedTodo: id });
  }

  _updateTodo(id, updatedTodoDetails) {

    const data = [...this.state.data];
    const updatedDataIndex = data.findIndex( (todo) => todo.id === id );

    data[updatedDataIndex] = updatedTodoDetails;

    this.setState({ data });

  }

  _dataFiltering(status) {
    const { data } = this.state;

    const filteredData = data.filter( todo => todo.status === status); 

    return filteredData;
  }

  render() {

    const { _onClickTodoItemHandler, _updateTodo, _dataFiltering, state } = this;
    const { data, selectedTodo } = state;

    return (
      <div className="columns">
        <div className="column">
          <Todos todos={ _dataFiltering('pending') } onClickTodoItemHandler={_onClickTodoItemHandler} />
          <Todos todos={ _dataFiltering('completed') } onClickTodoItemHandler={_onClickTodoItemHandler} />
        </div>
        <div className="column">
          {
            (selectedTodo) && <TodoDetailsBox updateTodo={_updateTodo} todoDetails={data.find( todo => todo.id === selectedTodo)} />
          }
        </div>
      </div>
    );
  }
}

ReactDom.render( <Todosfesa />, document.getElementById('root'));
