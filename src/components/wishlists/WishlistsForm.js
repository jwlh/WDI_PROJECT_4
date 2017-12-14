import React from 'react';

import { Form, FormGroup, Col, FormControl, ControlLabel, Button} from 'react-bootstrap';

import css from '../../scss/components/wishlist-form.scss';

function WishlistsForm({handleSubmitOnForm, handleSubmitOnAddContributor, handleChangeOnAddContributor, handleSubmitOnAddItem, handleChangeOnAddItem, handleChangeOnName, state, deleteList, errors}) {

  const formInvalid = Object.keys(errors).some(key => errors[key]);

  return (

    <div>


      <Form horizontal onSubmit={handleSubmitOnForm}>

        <FormGroup controlId="wishlistName">
          <Col sm={8}>
            <ControlLabel>Wishlist Name</ControlLabel>
            <FormControl
              type="text"
              name="wishlistName"
              placeholder="Change the name of you Wishlist"
              value={state.wishlist.wishlistName}
              onChange={handleChangeOnName}
            />
            {errors.wishlistName && <small>{errors.wishlistName}</small>}
          </Col>
        </FormGroup>

        <FormGroup controlId="newItem">
          <Col sm={8}>
            <ControlLabel>Product Name</ControlLabel>
            <FormControl
              type="text"
              name="product"
              placeholder="Product Name"
              value={state.newItem.product}
              onChange={handleChangeOnAddItem}
            />
          </Col>
          <Col sm={8}>
            <ControlLabel>Link to Product</ControlLabel>
            <FormControl
              type="text"
              name="url"
              placeholder="Link to Product"
              value={state.newItem.url}
              onChange={handleChangeOnAddItem}
            />
          </Col>

          <Col sm={8}>
            <Button type="button" className={css.button} bsStyle="info" onClick={handleSubmitOnAddItem}>
              Add this item
            </Button>
          </Col>

        </FormGroup>

        <FormGroup controlId="email">
          <Col sm={8}>
            <ControlLabel>Add a Contributor</ControlLabel>
            <FormControl
              type="email"
              name="email"
              placeholder="Add their email here..."
              onChange={handleChangeOnAddContributor}
              value={state.newContributor.email}
            />
          </Col>


          <Col sm={12}>
            <Button type="button" className={css.button} bsStyle="info" onClick={handleSubmitOnAddContributor}>
              Add Contributor
            </Button>
          </Col>

        </FormGroup>

        <FormGroup>
          <Col sm={8}>
            <Button disabled={formInvalid} type="submit" className={css.submitButton} bsStyle="success">
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
