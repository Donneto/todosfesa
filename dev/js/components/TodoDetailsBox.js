import React from 'react';
import moment from 'moment';

class TodoDetailsBox extends React.Component {

  constructor(props) {
    super(props);

    this._handleInputChange = this._handleInputChange.bind(this);
  }

  _handleInputChange(e, id) {

    const { todoDetails, updateTodo } = this.props;

    const updatedTodo = {
      ...todoDetails,
      [e.target.name]: e.target.value
    };

   updateTodo(id, updatedTodo);
  }

  render() {

    const { _handleInputChange, props } = this;
    const { todoDetails } = props;
    const { id, title, desc, dueDate, status } = todoDetails;

    return (
      <div className="card">
        <header className="card-header">
          <div className="card-header-title columns">
            <label htmlFor="" className="column is-2 todosfesa-todo-title">Title:</label>
            <div className="column is-10">
               <input className={`todosfesa-text-input ${(status==="completed") ? 'is-disabled' : ''}`} name="title" type="text" disabled={status==="completed"} value={title} onChange={ (e) => _handleInputChange(e, id) }/>
            </div>
          </div>
        </header>
        <div className="card-content columns is-multiline">
          <div className="column is-12">
            <div className="content">
              <p>
                 <b>Due Date:</b> <input className={`todosfesa-date-input ${(status==="completed") ? 'is-disabled' : ''} `} name="dueDate" type="date" disabled={status==="completed"} value={moment(dueDate).format('YYYY-MM-DD')} onChange={ (e) => _handleInputChange(e, id) } />
              </p>            
            </div>
          </div>
          <div className="column is-12">
            <div className="content">
              <textarea className={`todosfesa-textarea ${(status==="completed") ? 'is-disabled' : ''}`} name="desc" disabled={status==="completed"} value={desc} onChange={ (e) => _handleInputChange(e, id) } />
            </div>          
          </div>
        </div>
        <footer className="card-footer">
          <a className="card-footer-item button is-white" disabled={status==="completed"}>Save</a>
          <a className="card-footer-item button is-white" disabled={status==="completed"}>Complete</a>
          <a className="card-footer-item button is-white">Close</a>
        </footer>
      </div>

    );
  }
}

export default TodoDetailsBox;
