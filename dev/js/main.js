import { getData, setData } from './model/data';
import React from 'react';
import ReactDom from 'react-dom';
import Todos from './components/Todos';

class Todosfesa extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentWillMount() {

    let tempData = [ ...this.state.data ];

    tempData = getData('todos');

    this.setState({ data: tempData });

    setData('todos',
      [
        {
          title: 'oa',
          desc: 'localStorage',
          dueDate: new Date('07/08/2017'),
          status: 'completed'
        },
        {
          title: 'oa2',
          desc: 'localStorage2',
          dueDate: new Date('07/09/2017'),
          status: 'completed'
        }
      ]
    );
  }

  render() {
    return (
      <div className="columns">
        <div className="column">
          <Todos todos={this.state.data} todoType="pending" />
          <Todos todos={this.state.data} todoType="completed"/>
        </div>
        <div className="column">
          Detail
        </div>
      </div>
    );
  }
}

ReactDom.render( <Todosfesa />, document.getElementById('root'));
