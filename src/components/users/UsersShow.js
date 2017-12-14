import React from 'react';
import Axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

import css from '../../scss/components/users-show.scss';


class UsersShow extends React.Component {
  state = {
    user: {}
  }

  componentDidMount() {
    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => {
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
        {this.state.user.id === Auth.getPayload().userId && this.state.user.email && <div>
          <h3>Name: {this.state.user.firstName} {this.state.user.lastName}</h3>
          <h3>Username: {this.state.user.username}</h3>
          <h3>Email: {this.state.user.email}</h3>

          {this.state.user.id === Auth.getPayload().userId && <Link className={`btn btn-warning ${css.editButton}`} to={`/users/${this.props.match.params.id}/edit`}>Edit my Profile</Link>}
          <Row>
            <h3 className={css.sectionTitle}>My Wishlists</h3>
            {this.state.user.myWishlists.map(wishlist =>
              <Col xs={12} sm={6} md={4} key={wishlist.id}>

                <Link className={css.link}to={`/wishlists/${wishlist.id}`}>
                  <div className={css.container}>
                    <img className={css.picture} src={wishlist.createdBy.image}></img>
                    <h2 className={css.title} id="wishlist-index-title">{wishlist.createdBy.firstName} {wishlist.createdBy.lastName}&apos;s <br/> {wishlist.wishlistName}</h2>
                  </div>
                </Link>


              </Col>
            )}
          </Row>
          <Row>
            <h3 className={css.sectionTitle}>My Friend&apos;s Wishlists</h3>
            {this.state.user.subscribedWishlists.map(wishlist =>
              <Col xs={12} sm={6} md={4} key={wishlist.id}>

                <Link className={css.link}to={`/wishlists/${wishlist.id}`}>
                  <div className={css.container}>
                    <img className={css.picture} src={wishlist.createdBy.image}></img>
                    <h2 className={css.title} id="wishlist-index-title">{wishlist.createdBy.firstName} {wishlist.createdBy.lastName}&apos;s <br/> {wishlist.wishlistName}</h2>
                  </div>
                </Link>

              </Col>
            )}
          </Row>


        </div>}

        {this.state.user.id !== Auth.getPayload().userId && this.state.user.email && <div>
          <h3>Name: {this.state.user.firstName} {this.state.user.lastName}</h3>
          <h3>Username: {this.state.user.username}</h3>

          <Row>
            <h3 className={css.sectionTitle}>{this.state.user.firstName}&apos;s Wishlists</h3>
            {this.state.user.myWishlists.map(wishlist =>
              <Col xs={12} sm={6} md={4} key={wishlist.id}>

                <Link className={css.link}to={`/wishlists/${wishlist.id}`}>
                  <div className={css.container}>
                    <img className={css.picture} src='../../assets/images/wishlist-image.jpg'></img>
                    <h2 className={css.title} id="wishlist-index-title">{wishlist.createdBy.firstName} {wishlist.createdBy.lastName}&apos;s <br/> {wishlist.wishlistName}</h2>
                  </div>
                </Link>


              </Col>
            )}
          </Row>
          <Row>
            <h3 className={css.sectionTitle}>{this.state.user.firstName}&apos;s Friend&apos;s Wishlists</h3>
            {this.state.user.subscribedWishlists.map(wishlist =>
              <Col xs={12} sm={6} md={4} key={wishlist.id}>

                <Link className={css.link}to={`/wishlists/${wishlist.id}`}>
                  <div className={css.container}>
                    <img className={css.picture} src='../../assets/images/wishlist-image.jpg'></img>
                    <h2 className={css.title} id="wishlist-index-title">{wishlist.createdBy.firstName} {wishlist.createdBy.lastName}&apos;s <br/> {wishlist.wishlistName}</h2>
                  </div>
                </Link>


              </Col>
            )}
          </Row>


        </div>}


      </div>
    );
  }

}

export default UsersShow;
