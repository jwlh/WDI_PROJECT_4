import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import WishlistsForm from './WishlistsForm';

class WishlistsNew extends React.Component {
  state = {
    wishlist: {
      items: [],
      createdBy: {},
      contributors: []
    },
    newItem: {
      product: '',
      url: '',
      bought: false
    },
    newContributor: {
      email: ''
    },
    errors: {}
  };

  handleChangeOnAddItem = ({ target: { product, url } }) => {
    const newItem = Object.assign({}, this.state.newItem, { product: product , url: url, bought: false});
    this.setState({ newItem });
  }

  handleSubmitOnAddItem = (e) => {
    e.preventDefault();
    this.state.wishlist.items.push(this.state.newItem);
  }

  handleChangeOnAddContributor = ({ target: { email } }) => {
    const newContributor = Object.assign({}, this.state.newContributor, { email: email});
    this.setState({ newContributor });
  }

  handleSubmitOnAddContributor = (e) => {
    e.preventDefault();
    this.state.wishlist.contributors.push(this.state.newContributor);
  }

  handleSubmitOnForm = (e) => {
    e.preventDefault();

    Axios
      .post('/api/wishlists', this.state.wishlist, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <WishlistsForm
        handleSubmitOnForm={this.handleSubmitOnForm}
        handleChangeOnAddItem={this.handleChangeOnAddItem}
        handleSubmitOnAddItem={this.handleSubmitOnAddItem}
        handleChangeOnAddContributor={this.handleChangeOnAddContributor}
        handleSubmitOnAddContributor={this.handleSubmitOnAddContributor}
        wishlist={this.state.wishlist}
        state={this.state}
        errors={this.state.errors}
      />
    );
  }
}

export default WishlistsNew;
