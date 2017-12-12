import React from 'react';

import { Form, FormGroup, Col, FormControl, ControlLabel, Button} from 'react-bootstrap';

import css from '../../scss/components/wishlist-form.scss';

function WishlistsForm({handleSubmitOnForm, handleSubmitOnAddContributor, handleChangeOnAddContributor, handleSubmitOnAddItem, handleChangeOnAddItem, handleChangeOnName, state, deleteList}) {


  return (

    <div>


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
            <Button type="button" className={css.button} bsStyle="info" onClick={handleSubmitOnAddItem}>
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
            <Button type="button" className={css.button} bsStyle="info" onClick={handleSubmitOnAddContributor}>
              Add Contributor
            </Button>
          </Col>

        </FormGroup>


        <FormGroup>
          <Col smOffset={3} sm={8}>
            <Button type="submit" className={css.submitButton} bsStyle="success">
              Submit your list
            </Button>
            <Button bsStyle="danger" className={css.deleteButton} onClick={deleteList}>
              Delete Your List
            </Button>
          </Col>
        </FormGroup>
      </Form>
      <hr />
    </div>


  );
}

export default WishlistsForm;
