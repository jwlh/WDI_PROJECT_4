import React from 'react';
import Axios from 'axios';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import Auth from '../../lib/Auth';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class WishlistsShow extends React.Component {
  state = {
    wishlist: {},
    arrayOfContributorIds: []
  }

  componentDidMount() {
    Axios
      .get(`/api/wishlists/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ wishlist: res.data });
        this.state.wishlist.contributors.map(contributor =>  this.state.arrayOfContributorIds.push(contributor.id));
      })
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
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
    console.log('wishlist.contributors', this.state.wishlist.contributors);
    console.log('Auth.getPayload.userId', Auth.getPayload().userId);
    console.log('this.state.arrayOfContributorIds',this.state.arrayOfContributorIds);
    console.log('includes test', _.includes(this.state.arrayOfContributorIds, Auth.getPayload().userId));
    console.log('includes test 2', _.includes(this.state.wishlist.contributors, Auth.getPayload().userId));

    return(
      <div>

        {this.state.wishlist.items && <div>
          <h3>{this.state.wishlist.name}</h3>
          <ListGroup>
            {this.state.wishlist.items.map((item, i) =>
              <ListGroupItem key={i} header={item.product}>
                {/* {_.includes(this.state.arrayOfContributorIds, Auth.getPayload().userId) && !item.bought && <Button bsStyle="info" href={item.url}>Link to buy</Button>} */}
                {!item.bought && <Button bsStyle="info" href={item.url}>Link to buy</Button>}
                {this.state.wishlist.createdBy.id === Auth.getPayload().userId && <Button bsStyle="info" href={item.url}>Link to buy</Button>}
                {!item.bought && <Button bsStyle="info" onClick={() => this.buyItem(item)}>Mark this as bought</Button>}
                {item.bought && <Button bsStyle="danger" disabled>This item has already been bought</Button>}
              </ListGroupItem>
            )}
          </ListGroup>
          <div>
            <h6>Contributors: </h6>
            <ListGroup fill="true">
              {this.state.wishlist.contributors.map(contributor =>
                <ListGroupItem key={contributor.id} >{contributor.firstName} {this.state.wishlist.createdBy.id === Auth.getPayload().userId && contributor.email}</ListGroupItem>
              )}
            </ListGroup>
          </div>
          {this.state.wishlist.createdBy.id === Auth.getPayload().userId && <div>
            <Link to={`/wishlists/${this.state.wishlist.id}/edit`}>Edit Wishlist</Link>
          </div>}
        </div>}

      </div>
    );
  }

}

export default WishlistsShow;
