import moment from 'moment';

const dateFormat = date => moment(date).format('YYYY-MM-DD');

class TodoForm extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { submitFormHandler, updateTodosHandler, setCompletedTodoHandler, selectedTodo } = this.props;

    const minDate = new Date();

    return (
      <div className="box">
        <form action="" onSubmit={ submitFormHandler }>
          <div className="field">
            <label className="label">Title:</label>
            <p className="control">
              <input className="input" disabled={ selectedTodo.status === 'completed'} required type="text" name="title" placeholder="Text input" value={ selectedTodo.title } onChange={ e => { updateTodosHandler(e); }} ref={ (input) => { this.titleInput = input; } } />
            </p>
          </div>
          <div className="field">
            <label className="label">Due Date:</label>
            <p className="control">
              <input className="input" disabled={ selectedTodo.status === 'completed'} type="date" min={dateFormat(minDate)} name="dueDate" placeholder="Text input" value={ dateFormat(selectedTodo.dueDate) } onChange={ e => { updateTodosHandler(e); }} ref={ (input) => { this.dueDateInput = input; }}  />
            </p>
          </div>
          <div className="field">
            <label className="label">Description:</label>
            <p className="control">
              <textarea className="textarea" disabled={ selectedTodo.status === 'completed'} name="desc" placeholder="Textarea" value={ selectedTodo.desc } onChange={ e => { updateTodosHandler(e); }} ref={ (input) => { this.descInput = input; }}/>
            </p>
          </div>
          <div className="field is-grouped">
            <p className="control">
              <button className="button is-primary" disabled={ selectedTodo.status === 'completed'}>Save</button>
            </p>
            <p className="control">
              <button className="button is-primary" disabled={ selectedTodo.status === 'completed'} onClick={ e => setCompletedTodoHandler(e) }>Complete</button>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default TodoForm;
