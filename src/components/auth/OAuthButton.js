import React from 'react';
import OAuth from '../../lib/OAuth';
import axios from 'axios';
import Auth from '../../lib/Auth';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import css from '../../scss/components/OAuth-Button.scss';


class OAuthButton extends React.Component {

  componentWillMount() {

    this.provider = OAuth.getProvider(this.props.provider);

    if(!location.search.match(/code/) || localStorage.getItem('provider') !== this.provider.name) return false;

    if (!this.props.location.search.match(/code/)) return false;

    const data = queryString.parse(this.props.location.search);
    data.redirectUri = window.location.origin + window.location.pathname;

    axios.post(this.provider.url, data)
      .then(res => Auth.setToken(res.data.token))
      .then(() => localStorage.removeItem('provider'))
      .then(() => this.props.history.replace(this.props.location.pathname))
      .then(() => this.props.history.push(`/users/${Auth.getPayload().userId}`));
  }

  setProvider = () => {
    localStorage.setItem('provider', this.props.provider);
  }

  render() {
    return (
      <Button className={css.button} bsStyle="primary" href={this.provider.authLink} onClick={this.setProvider}>{this.props.children}</Button>
    );
  }
}

export default withRouter(OAuthButton);
