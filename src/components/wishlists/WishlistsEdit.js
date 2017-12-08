import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';


import { ListGroup, ListGroupItem, Button} from 'react-bootstrap';

import WishlistsForm from './WishlistsForm';

class WishlistsEdit extends React.Component {
  state = {
    wishlist: {
      name: '',
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


  componentDidMount() {
    Axios
      .get(`/api/wishlists/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ wishlist: res.data });
      })
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }

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
      .put(`/api/wishlists/${this.props.match.params.id}`, this.state.wishlist, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push(`/api/wishlists/${this.props.match.params.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  setBought(item) {
    item.bought = true;
    this.setState(item);
    Axios
      .put(`/api/wishlists/${this.props.match.params.id}`, this.state.wishlist, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }
  resetBought(item) {
    item.bought = false;
    this.setState(item);
    Axios
      .put(`/api/wishlists/${this.props.match.params.id}`, this.state.wishlist, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
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
                  <Button bsStyle="info" href={item.url}>Link to buy</Button>
                  {!item.bought && <Button bsStyle="info" onClick={() => this.setBought(item)}>Mark this as bought</Button>}
                  {item.bought && <Button bsStyle="info" onClick={() => this.resetBought(item)}>Mark this as not bought</Button>}
                  {!item.bought && <Button bsStyle="danger">Delete this item from your list</Button>}
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

export default WishlistsEdit;
