import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import Routes from './components/utility/Routes';
// import { Container } from 'react-bootstrap';
import Nav from './components/utility/Navbar';

import 'bootstrap-css-only';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div >
          <header>
            <Nav />
          </header>
          <main className="container">
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
