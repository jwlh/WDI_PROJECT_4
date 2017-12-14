import React from 'react';
import Axios from 'axios';
import { ListGroup, ListGroupItem, Button, Col, Media } from 'react-bootstrap';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

import css from '../../scss/components/wishlist-show.scss';


class WishlistsShow extends React.Component {
  state = {
    wishlist: {}
  }

  componentDidMount() {
    Axios
      .get(`/api/wishlists/${this.props.match.params.id}`)
      .then(res => this.setState({ wishlist: res.data }))
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
      });
  }

  buyItem(item) {
    item.bought = true;
    this.setState(item);
    Axios
      .put(`/api/wishlists/${this.props.match.params.id}`, this.state.wishlist, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    if(!this.state.wishlist.contributors) return null;
    const contributorIds = this.state.wishlist.contributors.map(contributor =>  contributor.id);
    const userIsContributor = contributorIds.includes(Auth.getPayload().userId);
    return(
      <div>

        <Col>
          {this.state.wishlist.items &&
            <h2 className={css.listName}>{this.state.wishlist.createdBy.firstName}&apos;s {this.state.wishlist.wishlistName}</h2>
          }
          {this.state.wishlist.createdBy.id === Auth.getPayload().userId && <div className={css.centered}>
            <Link className={`btn btn-warning ${css.editButton}`} to={`/wishlists/${this.state.wishlist.id}/edit`}>Edit Your Wishlist</Link>
          </div>}
        </Col>

        <Col sm={8}>
          <h3 className={css.titleFont}>Items</h3>
          <ListGroup>
            {this.state.wishlist.items.map((item, i) =>
              <ListGroupItem key={i} header={item.product}>
                {this.state.wishlist.createdBy.id === Auth.getPayload().userId && <Button className={css.button} bsStyle="info" href={item.url} target="_blank">Link to buy</Button>}
                {userIsContributor && !item.bought && <Button className={css.button} bsStyle="info" href={item.url} target="_blank">Link to buy</Button>}
                {userIsContributor && !item.bought && <Button className={css.button} bsStyle="success" onClick={() => this.buyItem(item)}>Mark this as bought</Button>}
                {userIsContributor && item.bought && <Button className={css.button} bsStyle="danger" disabled>This has been bought</Button>}
              </ListGroupItem>
            )}
          </ListGroup>
        </Col>

        <Col sm={4}>
          <div>
            <h3 className={css.titleFont}>Gifters</h3>
            <ListGroup fill="true">
              {this.state.wishlist.contributors.map(contributor =>
                <Link key={contributor.id} to={`/users/${contributor.id}`}>
                  <ListGroupItem >
                    <Media>
                      <Media.Left align="middle">
                        <div className={css.contributorImageContainer}>
                          <img className={css.contributorImage} src={contributor.image} alt="placeholder thumbnail" />
                        </div>
                      </Media.Left>
                      <Media.Body align="middle">
                        {contributor.firstName} {contributor.lastName}
                      </Media.Body>
                    </Media>
                  </ListGroupItem>
                </Link>
              )}
            </ListGroup>
          </div>
        </Col>

      </div>

    );
  }

}

export default WishlistsShow;
