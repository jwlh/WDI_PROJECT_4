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


        <Row >
          <Col sm={6}>
            <div className={css.userInfo}>
              <h1 className={css.textColor}>{this.state.user.firstName} {this.state.user.lastName}</h1>
              {Auth.getPayload().userID === this.props.match.params.id   && <Link className={`btn btn-warning ${css.editButton}`} to={`/users/${this.props.match.params.id}/edit`}>Edit my Profile</Link>}
            </div>
          </Col>
        </Row>
        {this.state.user.id === Auth.getPayload().userId && this.state.user.email &&
          <div>
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

        {this.state.user.id !== Auth.getPayload().userId && this.state.user.email &&
          <div>
            <Row>
              <h3 className={css.sectionTitle}>{this.state.user.firstName}&apos;s Wishlists</h3>
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
              <h3 className={css.sectionTitle}>{this.state.user.firstName}&apos;s Friend&apos;s Wishlists</h3>
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


      </div>
    );
  }

}

export default UsersShow;
