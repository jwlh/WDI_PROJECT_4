import React from 'react';
import Axios from 'axios';
// import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';



class UsersShow extends React.Component {
  state = {
    user: {}
  }

  componentDidMount() {
    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => {
        console.log(res.data);
        this.setState({ user: res.data });
      })
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }



  render() {
    return(
      <div>
        {this.state.user.email && <div>
          <h3>{this.state.user.firstName} {this.state.user.lastName}</h3>
          <h4>{this.state.user.username}</h4>
          <h4>{this.state.user.email}</h4>
          <img src={this.state.user.image}></img>
          {this.state.user.id === Auth.getPayload().userId && <Link to={`/users/${this.props.match.params.id}/edit`}>Edit my Profile</Link>}
          <h3>My Wishlists</h3>
          {this.state.user.myWishlists.map(wishlist =>
            <Link key={wishlist.id} to={`/wishlists/${wishlist.id}`}>{wishlist.createdBy.username}&apos;s {wishlist.wishlistName}</Link>
          )}
          <h3>My Friends Wishlists</h3>
          {this.state.user.subscribedWishlists.map(wishlist =>
            <Link key={wishlist.id} to={`/wishlists/${wishlist.id}`}>{wishlist.createdBy.username}&apos;s {wishlist.wishlistName}</Link>
          )}


        </div>}

      </div>
    );
  }

}

export default UsersShow;
