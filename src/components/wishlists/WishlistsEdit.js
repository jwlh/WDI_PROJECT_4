import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import { ListGroup, ListGroupItem, Button, Col} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import WishlistsForm from './WishlistsForm';

import css from '../../scss/components/wishlist-edit.scss';


class WishlistsEdit extends React.Component {
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

  handleChangeOnName = ({ target: { value } }) => {
    const newWishlist = Object.assign({}, this.state.wishlist, { wishlistName: value });
    this.setState({ wishlist: newWishlist });
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
      .then(() => this.props.history.push(`/wishlists/${this.state.wishlist.id}`))
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

  deleteItem(item) {
    const newItems = Object.assign([], this.state.wishlist.items.filter(product => product !== item));
    const newWishlist = Object.assign({}, this.state.wishlist, {items: newItems});

    this.setState({wishlist: newWishlist}, ()=> {
      Axios
        .put(`/api/wishlists/${this.props.match.params.id}`, this.state.wishlist, {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        .catch(err => this.setState({ errors: err.response.data.errors }));
    });


  }

  deleteList = () => {
    Axios
      .delete(`/api/wishlists/${this.props.match.params.id}`, {headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/'));
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

          state={this.state}
          errors={this.state.errors}
          deleteList={this.deleteList}
        />


        {this.state.wishlist.wishlistName && <Col><h3 className={css.listName}>{this.state.wishlist.wishlistName}</h3></Col>}
        <Col sm={8}>
          {this.state.wishlist.items && <div>
            <h4 className={css.titleFont}>List of Gifts:</h4>
            <ListGroup>
              {this.state.wishlist.items.map((item, i) =>
                <ListGroupItem key={i} header={item.product}>
                  <Button bsStyle="info" className={css.button} href={item.url}>Link to buy</Button>
                  {!item.bought && <Button className={css.button} bsStyle="info" onClick={() => this.setBought(item)}>Mark this as bought</Button>}
                  {!item.bought && <Button bsStyle="danger" className={css.button} onClick={() => this.deleteItem(item)}>Delete this item from your list</Button>}
                  {item.bought && <Button bsStyle="danger" disabled className={css.button}>This item has already been bought</Button>}
                </ListGroupItem>
              )}
            </ListGroup>
          </div>}
        </Col>

        <Col sm={4}>
          {this.state.wishlist.contributors && <div>
            <h4 className={css.titleFont}>List of Gifters:</h4>
            <ListGroup fill="true">
              {this.state.wishlist.contributors.map((contributor, i) =>
                <Link key={i} to={`/users/${contributor.id}`}>
                  <ListGroupItem>{contributor.firstName} {contributor.lastName}</ListGroupItem>
                </Link>
              )}
            </ListGroup>
          </div> }
        </Col>

      </div>
    );
  }
}

export default WishlistsEdit;
