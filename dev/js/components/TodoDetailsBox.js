import React from 'react';
import TodoForm from './TodoForm';

class TodoDetailsBox extends React.Component {

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.updateProps = this.updateProps.bind(this);
    this.setCompleted = this.setCompleted.bind(this);
  }

  submitForm(e) {
    e.preventDefault();

    this.props.updateTodos();
  }

  updateProps(e) {

    const { currentTodo, updateTodo } = this.props;

    const updatedTodo = {
      ...currentTodo,
      [e.target.name]: e.target.value
    };

    updateTodo(updatedTodo);
  }

  setCompleted(e) {
    e.preventDefault();

    const updatedTodo = this.props.currentTodo;

    updatedTodo.status = 'completed';

    this.props.updateTodo(updatedTodo);
    this.props.updateTodos();

  }

  render() {

    const { submitForm, updateProps, setCompleted, props } = this;
    const { currentTodo } = props;

    return (
      <div className="box">
        <h2><b>Edit the information of an existing Todo</b></h2>
        <TodoForm
          submitFormHandler = {submitForm}
          updateTodosHandler = {updateProps}
          setCompletedTodoHandler = {setCompleted}
          selectedTodo = {currentTodo}
        />
      </div>
    );
  }
}

export default TodoDetailsBox;
