import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import Routes from './components/utility/Routes';
import Nav from './components/utility/Navbar';
import Logo from './components/utility/Logo';

import 'bootstrap-css-only';
import 'font-awesome/css/font-awesome.css';
import './scss/style.scss';


class App extends React.Component {

  render() {
    return (
      <Router>
        <div >
          <header>
            <Nav />
          </header>
          <main className="container">
            <Logo />
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
