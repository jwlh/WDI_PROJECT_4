import React from 'react';
import LoginForm from './LoginForm';
import Axios from 'axios';
import Auth from '../../lib/Auth';

class Login extends React.Component {

  state = {
    credentials: {
      email: '',
      password: ''
    }
  };

  handleChange = ({ target: { name, value } }) => {
    const credentials = Object.assign({}, this.state.credentials, { [name]: value });
    this.setState({ credentials });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('/api/login', this.state.credentials)
      .then((res) => {
        console.log('res.data after post', res.data);
        Auth.setToken(res.data.token);
        if (res.data.locked) {
          return this.props.history.push(`/users/${res.data.user.id}/edit`);
        }
        return this.props.history.push(`/users/${res.data.user.id}`);
      })
      .catch(() => {
        Auth.logout();
        this.props.history.push('/login');
      });
  }

  render() {
    return (
      <div>
        <LoginForm
          credentials={this.state.credentials}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default Login;
