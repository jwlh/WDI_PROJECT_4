import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';


import { ListGroup, ListGroupItem, Button} from 'react-bootstrap';

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

  handleChangeOnAddItem = ({ target: { name, value } }) => {
    const newItem = Object.assign({}, this.state.newItem, { [name]: value });
    this.setState({ newItem });
  }

  handleSubmitOnAddItem = (e) => {
    e.preventDefault();
    const newWishlist = Object.assign({},this.state.wishlist.items.push(this.state.newItem));
    const emptyNewItem = {product: '', url: '', bought: false};
    this.setState({
      newWishlist,
      newItem: emptyNewItem
    });
  }

  handleChangeOnAddContributor = ({ target: { name, value } }) => {
    const newContributor = Object.assign({}, this.state.newContributor, { [name]: value});
    this.setState({ newContributor });
  }

  handleSubmitOnAddContributor = (e) => {
    e.preventDefault();

    const addNewContibutor = Object.assign({}, this.state.wishlist.contributors.push(this.state.newContributor));
    const emptyNewContributor = {email: ''};
    this.setState({
      addNewContibutor,
      newContributor: emptyNewContributor
    });
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
      <div>
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
        <div>

          {this.state.wishlist.items && <div>
            <ListGroup>
              {this.state.wishlist.items.map((item, i) =>
                <ListGroupItem key={i} header={item.product}>
                  {!item.bought && <Button bsStyle="info" href={item.url}>Link to buy</Button>}
                  {!item.bought && <Button bsStyle="info">Mark this as bought</Button>}
                  {item.bought && <Button bsStyle="danger" disabled>This item has already been bought</Button>}
                </ListGroupItem>
              )}
            </ListGroup>
            <div>
              <h6>Contributors: </h6>
              <ul>
                {this.state.wishlist.contributors.map((contributor, i) =>
                  <li key={i}>{contributor.email}</li>
                )}
              </ul>
            </div>
          </div>}

        </div>
      </div>
    );
  }
}

export default WishlistsNew;
