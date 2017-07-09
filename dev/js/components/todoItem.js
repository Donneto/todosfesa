import React from 'react';
import moment from 'moment';

class TodoItem extends React.Component {
  constructor(props) {

    super(props);

    this._onClickTodoPanelHandler = this._onClickTodoPanelHandler.bind(this);
  }

  _onClickTodoPanelHandler(e) {
    e.preventDefault();

    this.props.onClickTodoItemHandler(this.props.item.id);
  }

  render() {

    const { _onClickTodoPanelHandler, props } = this;
    const { title, dueDate } = props.item;

    return(
      <a className="panel-block" onClick={_onClickTodoPanelHandler}>
        <b>{title}</b> - <small className="is-left"> Due: {moment(dueDate).format('dddd, MMMM Do, YYYY')}</small>
      </a>
    );
  }
}

export default TodoItem;
