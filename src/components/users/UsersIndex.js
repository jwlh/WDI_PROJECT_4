import React from 'react';
import Axios from 'axios';
// import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';



class UsersIndex extends React.Component {
  state = {
    users: []
  }

  componentWillMount() {
    Axios
      .get('/api/users')
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
        {this.state.users.map(user =>
          <div key={user.id}>
            <Link to={`/users/${user.id}`}>
              <h3>{user.username}</h3>
            </Link>
          </div>
        )}
      </div>
    );
  }

}

export default UsersIndex;
