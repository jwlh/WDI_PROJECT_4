import React from 'react';

import { Form, FormGroup, Col, FormControl, ControlLabel, Button, Row} from 'react-bootstrap';

import css from '../../scss/components/wishlist-form.scss';

function WishlistsForm({handleSubmitOnForm, handleSubmitOnAddContributor, handleChangeOnAddContributor, handleSubmitOnAddItem, handleChangeOnAddItem, handleChangeOnName, state, deleteList, errors}) {

  const formInvalid = Object.keys(errors).some(key => errors[key]);

  return (

    <div>


      <Form horizontal onSubmit={handleSubmitOnForm}>

        <FormGroup controlId="wishlistName">
          <Row>
            <Col componentClass={ControlLabel} sm={2}>
              Wishlist Name
            </Col>
            <Col sm={6}>
              <FormControl
                type="text"
                name="wishlistName"
                placeholder="Change the name of you Wishlist"
                value={state.wishlist.wishlistName}
                onChange={handleChangeOnName}
              />
              {errors.wishlistName && <small>{errors.wishlistName}</small>}
            </Col>
            <Col sm={4}>
            </Col>
          </Row>
        </FormGroup>

        <FormGroup controlId="newItem">
          <Row>
            <Col componentClass={ControlLabel} sm={2}>
              Product Name
            </Col>
            <Col sm={6}>
              <FormControl
                type="text"
                name="product"
                placeholder="Product Name"
                value={state.newItem.product}
                onChange={handleChangeOnAddItem}
              />
            </Col>
            <Col sm={4}>
            </Col>
          </Row>
          <Row>
            <Col componentClass={ControlLabel} sm={2}>
              Link to Product
            </Col>
            <Col sm={6}>
              <FormControl
                type="text"
                name="url"
                placeholder="Link to Product"
                value={state.newItem.url}
                onChange={handleChangeOnAddItem}
              />
            </Col>
            <Col sm={4}>
            </Col>
          </Row>
          <Row>
            <Col smOffset={2} sm={6}>
              <Button type="button" className={css.button} bsStyle="info" onClick={handleSubmitOnAddItem}>
                Add this item
              </Button>
            </Col>
            <Col sm={4}>
            </Col>
          </Row>

        </FormGroup>

        <FormGroup controlId="lastName">
          <Row>
            <Col componentClass={ControlLabel} sm={2}>
              Add a Contributor
            </Col>
            <Col sm={6}>
              <FormControl
                type="email"
                name="email"
                placeholder="Add their email here..."
                onChange={handleChangeOnAddContributor}
                value={state.newContributor.email}
              />
            </Col>
            <Col sm={4}>
            </Col>
          </Row>
          <Row>
            <Col smOffset={2} sm={6}>
              <Button type="button" className={css.button} bsStyle="info" onClick={handleSubmitOnAddContributor}>
                Add Contributor
              </Button>
            </Col>
            <Col sm={4}>
            </Col>
          </Row>

        </FormGroup>


        <FormGroup>
          <Row>
            <Col smOffset={2} sm={6}>
              <Button disabled={formInvalid} type="submit" className={css.submitButton} bsStyle="success">
                Submit your list
              </Button>
              <Button bsStyle="danger" className={css.deleteButton} onClick={deleteList}>
                Delete Your List
              </Button>
            </Col>
            <Col sm={4}>
            </Col>
          </Row>
        </FormGroup>
      </Form>
      <hr />
    </div>


  );
}

export default WishlistsForm;
