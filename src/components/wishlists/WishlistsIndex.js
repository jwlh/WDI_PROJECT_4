import React from 'react';
import Axios from 'axios';
import { Image, Grid, Row, Col, Thumbnail, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
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
              <Thumbnail>
                <Image responsive src='../../assets/images/wishlist-image.jpg'/>
                <Link to={`/wishlists/${wishlist.id}`}>
                  <h3 id="wishlist-index-title">{wishlist.createdBy.firstName} {wishlist.createdBy.lastName}&apos;s <br/> {wishlist.wishlistName}</h3>
                </Link>
                <Panel collapsible header="View Contributors">

                  <ListGroup fill>
                    {wishlist.contributors.map(contributor =>
                      <ListGroupItem key={contributor.id} style={{marginRight: '10px'}}>{contributor.firstName}</ListGroupItem>
                    )}
                  </ListGroup>
                </Panel>
              </Thumbnail>


            </Col>
          )}
        </Row>
      </Grid>
    );
  }

}

export default WishlistsIndex;
