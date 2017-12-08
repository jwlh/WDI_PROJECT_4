import React from 'react';
import UsersForm from './UsersForm';
import Axios from 'axios';
import Auth from '../../lib/Auth';

class UsersEdit extends React.Component {

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

  componentDidMount() {
    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => {
        console.log('data coming back from api in get request',res.data);
        this.setState({ user: res.data });
      })
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }

  handleChange = ({ target: { name, value }}) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // this.setState('locked': false);
    console.log('data being sent to api in put request',this.state.user);
    Axios
      .put(`/api/users/${this.props.match.params.id}`, this.state.user, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => {
        this.props.history.push(`/users/${this.props.match.params.id}`);
      })
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <UsersForm
        user={this.state.user}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
      />
    );
  }
}

export default UsersEdit;
