import React from 'react';
import Axios from 'axios';
// import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';



class WishlistsIndex extends React.Component {
  state = {
    wishlists: []
  }

  componentWillMount() {
    Axios
      .get('/api/wishlists')
      .then(res => this.setState({ wishlists: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
        {this.state.wishlists.map(wishlist =>
          <div key={wishlist.id}>
            <Link to={`/wishlists/${wishlist.id}`}>
              <img src={wishlist.createdBy.image}></img>
              <h3>{wishlist.createdBy.username}s Wishlist</h3>
            </Link>
            <h4>Contributors:</h4>
            {wishlist.contributors.map(contributor =>
              <p key={contributor.id}>{contributor.username}</p>
            )}
          </div>
        )}
      </div>
    );
  }

}

export default WishlistsIndex;
