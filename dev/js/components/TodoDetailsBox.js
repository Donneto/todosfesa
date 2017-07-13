import moment from 'moment';

const dateFormat = date => moment(date).format('YYYY-MM-DD');

class TodoDetailsBox extends React.Component {

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.updateProps = this.updateProps.bind(this);
    this.setCompleted = this.setCompleted.bind(this);
    this.sendNewTodo = this.sendNewTodo.bind(this);
  }

  submitForm(e) {
    e.preventDefault();

    this.props.updateTodos();
  }

  updateProps(e) {

    const updatedTodo = {
      ... this.props.currentTodo,
      [e.target.name]: e.target.value
    };

    this.props.updateTodo(updatedTodo);
  }

  setCompleted(e) {
    e.preventDefault();

    const updatedTodo = this.props.currentTodo;

    updatedTodo.status = 'completed';

    this.props.updateTodo(updatedTodo);
    this.props.updateTodos();
  }

  sendNewTodo(e) {
    e.preventDefault();

    if (this.titleInput.value === '') {
      this.titleInput.classList.add('is-danger');

      return false;
    }

    this.props.addNewTodo();

    return true;
  }

  render() {

    return (
      <div className="box">
        <form action="" onSubmit={ this.submitForm }>
          <div className="field">
            <label className="label">Title:</label>
            <p className="control">
              <input className="input" disabled={ this.props.currentTodo.status === 'completed'} required type="text" name="title" placeholder="Text input" value={ this.props.currentTodo.title } onChange={ e => { this.updateProps(e, this.props.currentTodo); }} ref={ (input) => { this.titleInput = input; } } />
            </p>
          </div>
          <div className="field">
            <label className="label">Due Date:</label>
            <p className="control">
              <input className="input" disabled={ this.props.currentTodo.status === 'completed'} type="date" name="dueDate" placeholder="Text input" min={ dateFormat(new Date()) } value={ dateFormat(this.props.currentTodo.dueDate) } onChange={ e => { this.updateProps(e); }} ref={ (input) => { this.dueDateInput = input; }}  />
            </p>
          </div>
          <div className="field">
            <label className="label">Description:</label>
            <p className="control">
              <textarea className="textarea" disabled={ this.props.currentTodo.status === 'completed'} name="desc" placeholder="Textarea" value={ this.props.currentTodo.desc } onChange={ e => { this.updateProps(e); }} ref={ (input) => { this.descInput = input; }}/>
            </p>
          </div>
          <div className="field is-grouped">
            <p className={`control ${this.props.currentTodo.isNew ? 'is-hidden' : '' }`}>
              <button className="button is-primary" disabled={ this.props.currentTodo.status === 'completed'}>Save</button>
            </p>
            <p className={`control ${this.props.currentTodo.isNew ? 'is-hidden' : '' }`}>
              <button className="button is-primary" disabled={ this.props.currentTodo.status === 'completed'} onClick={ e => this.setCompleted(e) }>Complete</button>
            </p>
            <p className={`control ${!this.props.currentTodo.isNew ? 'is-hidden' : '' }`}>
              <button className="button is-primary" onClick={ (e) => this.sendNewTodo(e) }>Add</button>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default TodoDetailsBox;
