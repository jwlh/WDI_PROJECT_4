import React from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';

import OAuthButton from './OAuthButton';

import css from '../../scss/components/register-form.scss';


const RegisterForm = ({ handleChange, handleSubmit, user, errors}) => {
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
          {errors.email && <small>{errors.email}</small>}
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={3}>
          Password
        </Col>
        <Col sm={8}>
          <FormControl
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={user.password}
          />
          {errors.password && <small>{errors.password}</small>}
        </Col>
      </FormGroup>
      <FormGroup controlId="formHorizontalConfirmPassword">
        <Col componentClass={ControlLabel} sm={3}>
          Confirm Password
        </Col>
        <Col sm={8}>
          <FormControl
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={user.passwordConfirmation}
          />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={3} sm={8}>
          <Button type="submit" className={css.submitButton} bsStyle="success">
            Register
          </Button>
        </Col>
        <Col smOffset={3} sm={8}>
          <OAuthButton provider="facebook"><i className="fa fa-facebook-official" aria-hidden="true"></i> Register with Facebook</OAuthButton>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default RegisterForm;
