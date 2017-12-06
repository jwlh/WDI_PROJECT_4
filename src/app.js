import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import Routes from './components/utility/Routes';
import { Container } from 'react-bootstrap';


import 'bootstrap-css-only';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="container">
          <main>
            <Routes />
          </main>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
