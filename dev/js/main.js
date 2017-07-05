import React from 'react';
import ReactDOM from 'react-dom';
import logger from './modules/logger';

logger();

class App extends React.Component {

  render() {

    return(
      <div>
        <h1>HELLO</h1>
        <p>tu madre prro</p>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
