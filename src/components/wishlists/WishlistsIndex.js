import React from 'react';
import Axios from 'axios';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
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
      <Grid>
        <Row>
          {this.state.wishlists.map(wishlist =>
            <Col xs={6} md={4} key={wishlist.id}>
              <Thumbnail responsive="true" src='../../assets/images/wishlist-image.jpg'>
                <Link to={`/wishlists/${wishlist.id}`}>
                  <h3>{wishlist.createdBy.username}&apos;s <br/> {wishlist.wishlistName}</h3>
                </Link>
                <h4>Contributors:</h4>
                {wishlist.contributors.map(contributor =>
                  <p key={contributor.id}>{contributor.username}</p>
                )}
              </Thumbnail>
            </Col>
          )}
        </Row>
      </Grid>
    );
  }

}

export default WishlistsIndex;
