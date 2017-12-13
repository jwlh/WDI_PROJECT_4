import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';


import { ListGroup, ListGroupItem, Button, Col} from 'react-bootstrap';

import WishlistsForm from './WishlistsForm';

import css from '../../scss/components/wishlist-new.scss';

class WishlistsNew extends React.Component {
  state = {
    wishlist: {
      wishlistName: '',
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

  handleChangeOnName = ({ target: { value } }) => {
    const newWishlist = Object.assign({}, this.state.wishlist, { wishlistName: value });
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ wishlist: newWishlist, errors });
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
      .post('/api/wishlists', this.state.wishlist, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then((res) => {
        console.log(res);
        this.props.history.push(`/wishlists/${res.data.id}`);
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
          handleChangeOnName={this.handleChangeOnName}
          wishlist={this.state.wishlist}
          state={this.state}
          errors={this.state.errors}
        />
        <div>
          {this.state.wishlist.wishlistName && <Col><h3 className={css.listName}>{this.state.wishlist.wishlistName}</h3></Col>}
          <Col sm={8}>
            {this.state.wishlist.items[0] && <div>
              <h4 className={css.titleFont}>List of Gifts:</h4>
              <ListGroup>
                {this.state.wishlist.items.map((item, i) =>
                  <ListGroupItem key={i} header={item.product}>
                    <Button bsStyle="info" href={item.url}>Link to buy</Button>
                  </ListGroupItem>
                )}
              </ListGroup>
            </div>
            }
          </Col>

          <Col sm={4}>
            <div>
              {this.state.wishlist.contributors[0] && <h4 className={css.titleFont}>List of Contributors:</h4> }
              <ListGroup fill="true">
                {this.state.wishlist.contributors[0] && this.state.wishlist.contributors.map((contributor, i) =>
                  <ListGroupItem key={i} >{contributor.email}</ListGroupItem>
                )}
              </ListGroup>
            </div>

          </Col>

        </div>
      </div>
    );
  }
}

export default WishlistsNew;
