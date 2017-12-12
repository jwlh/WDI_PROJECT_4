import React from 'react';

import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';

function WishlistsForm({handleSubmitOnForm, handleSubmitOnAddContributor, handleChangeOnAddContributor, handleSubmitOnAddItem, handleChangeOnAddItem, handleChangeOnName, state}) {


  return (

    <div>
      <Col smOffset={3} sm={8}><h3>{state.wishlist.wishlistName}</h3></Col>

      <Form horizontal onSubmit={handleSubmitOnForm}>
        <FormGroup controlId="wishlistName">
          <Col componentClass={ControlLabel} sm={3}>
            Wishlist Name
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              name="wishlistName"
              placeholder="Change the name of you Wishlist"
              value={state.wishlist.wishlistName}
              onChange={handleChangeOnName}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="newItem">
          <Col componentClass={ControlLabel} sm={3}>
            Product Name
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              name="product"
              placeholder="Product Name"
              value={state.newItem.product}
              onChange={handleChangeOnAddItem}
            />
          </Col>
          <Col componentClass={ControlLabel} sm={3}>
            Link to Product
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              name="url"
              placeholder="Link to Product"
              value={state.newItem.url}
              onChange={handleChangeOnAddItem}
            />
          </Col>
          <Col smOffset={3} sm={8}>
            <Button type="button" onClick={handleSubmitOnAddItem}>
              Add this item
            </Button>
          </Col>
        </FormGroup>
        <FormGroup controlId="lastName">
          <Col componentClass={ControlLabel} sm={3}>
            Add a Contributor
          </Col>
          <Col sm={8}>
            <FormControl
              type="email"
              name="email"
              placeholder="Add their email here..."
              onChange={handleChangeOnAddContributor}
              value={state.newContributor.email}
            />
          </Col>
          <Col smOffset={3} sm={8}>
            <Button type="button" onClick={handleSubmitOnAddContributor}>
              Add Contributor
            </Button>
          </Col>
        </FormGroup>


        <FormGroup>
          <Col smOffset={3} sm={8}>
            <Button type="submit">
              Submit your list
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>


  );
}

export default WishlistsForm;
