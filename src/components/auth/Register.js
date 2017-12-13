import React from 'react';
import RegisterForm from './RegisterForm';
import Axios from 'axios';



class Register extends React.Component {

  state = {
    user: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      locked: ''
    },
    errors: {}
  };

  handleChange = ({ target: { name, value }}) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ user, errors });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState('locked': false);
    Axios.post('/api/register', this.state.user)
      .then(() => {
        this.props.history.push('/login');
      })
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <div>
        <RegisterForm
          user={this.state.user}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
        />

      </div>
    );
  }
}

export default Register;
