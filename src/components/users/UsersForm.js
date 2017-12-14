import React from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';
import DragDrop from '../utility/DragDrop';

import css from '../../scss/components/users-form.scss';


const UsersForm = ({ handleChange, handleSubmit, user}) => {
  return (

    <Form horizontal onSubmit={handleSubmit}>
      <FormGroup controlId="firstName">
        <Col componentClass={ControlLabel} sm={3}>
          First Name
        </Col>
        <Col sm={8}>
          <FormControl
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            value={user.firstName}
          />
        </Col>
      </FormGroup>
      <FormGroup controlId="lastName">
        <Col componentClass={ControlLabel} sm={3}>
          Last Name
        </Col>
        <Col sm={8}>
          <FormControl
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            value={user.lastName}
          />
        </Col>
      </FormGroup>
      <FormGroup controlId="username">
        <Col componentClass={ControlLabel} sm={3}>
          Username
        </Col>
        <Col sm={8}>
          <FormControl
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={user.username}
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={3}>
          Email
        </Col>
        <Col sm={8}>
          <FormControl
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={user.email}
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={3}>
          Change Password
        </Col>
        <Col sm={8}>
          <FormControl
            type="password"
            name="password"
            placeholder="Only fill this in if you want to change your password"
            onChange={handleChange}
          />
        </Col>
      </FormGroup>
      <FormGroup controlId="formHorizontalConfirmPassword">
        <Col componentClass={ControlLabel} sm={3}>
          Confirm New Password
        </Col>
        <Col sm={8}>
          <FormControl
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col componentClass={ControlLabel} sm={3}>
          <label htmlFor="image">Image</label>
        </Col>
        <Col sm={8}>
          <DragDrop
            onChange={handleChange}
            value={user.base64 || user.imageSRC}
          />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={3} sm={8}>
          <Button type="submit" className={css.submitButton} bsStyle="success">
            Update
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default UsersForm;
