import React from 'react';
import Axios from 'axios';


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
            {wishlist.items.map((item, i) =>
              <div key={i}>
                <p>{item.product}</p>
                <p>{item.url}</p>
              </div>
            )}
            <p>{wishlist.createdBy.username}</p>
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
