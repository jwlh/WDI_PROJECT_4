import React from 'react';
import Axios from 'axios';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';


class WishlistsShow extends React.Component {
  state = {
    wishlist: {}
  }

  componentDidMount() {
    Axios
      .get(`/api/wishlists/${this.props.match.params.id}`)
      .then(res => {
        console.log(res.data);
        this.setState({ wishlist: res.data });
      })
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }



  render() {
    console.log(this.state.wishlist);
    return(
      <div>

        {this.state.wishlist.items && <div>
          <ListGroup>
            {this.state.wishlist.items.map((item, i) =>
              <ListGroupItem key={i} header={item.product}>
                {!item.bought && <Button bsStyle="info" href={item.url}>Link to buy</Button>}
                {!item.bought && <Button bsStyle="info">Mark this as bought</Button>}
                {item.bought && <Button bsStyle="danger" disabled>This item has already been bought</Button>}
              </ListGroupItem>
            )}
          </ListGroup>
          <div>
            <h6>Contributors: </h6>
            <ul>
              {this.state.wishlist.contributors.map((contributor, i) =>
                <li key={i}>{contributor.username}</li>
              )}
            </ul>
          </div>
        </div>}

      </div>
    );
  }

}

export default WishlistsShow;
