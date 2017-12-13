import React from 'react';
import Axios from 'axios';
import { Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import css from '../../scss/components/wishlist-index.scss';

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
            <Col xs={12} sm={6} md={4} key={wishlist.id}>

              <Thumbnail>
                <Image className={css.image} responsive src='../../assets/images/wishlist-image.jpg'/>
                <Link className={css.link}to={`/wishlists/${wishlist.id}`}>
                  <h2 className={css.title} id="wishlist-index-title">{wishlist.createdBy.firstName} {wishlist.createdBy.lastName}&apos;s <br/> {wishlist.wishlistName}</h2>
                </Link>
              </Thumbnail>


            </Col>
          )}
        </Row>
      </Grid>
    );
  }

}



export default WishlistsIndex;
