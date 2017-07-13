import TodoForm from './TodoForm';

class TodoNewTask extends React.Component {

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.createTask = this.createTask.bind(this);
    this.setCompleted = this.setCompleted.bind(this);
  }

  submitForm(e) {
    e.preventDefault();

    this.props.updateTodos();
  }

  createTask(e) {

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

    const { submitForm, createTask, setCompleted, props } = this;
    const { currentTodo } = props;

    return (
      <div className="box">
        <h2><b>Enter information for a new Todo:</b></h2>
        <TodoForm
          submitFormHandler={submitForm}
          updateTodosHandler={createTask}
          setCompletedTodoHandler={setCompleted}
          selectedTodo={currentTodo}
        />
      </div>
    );
  }
}

export default TodoNewTask;
