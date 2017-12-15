import React from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';

import css from '../../scss/components/Login-form.scss';

import OAuthButton from './OAuthButton';

const LoginForm = ({ handleChange, handleSubmit}) => {
  return (
    <Form horizontal onSubmit={handleSubmit}>
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={3}>
          Email
        </Col>
        <Col sm={6}>
          <FormControl
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={3}>
          Password
        </Col>
        <Col sm={6}>
          <FormControl
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={3} sm={6}>
          <Button type="submit" className={css.submitButton} bsStyle="success">
            Log In
          </Button>
        </Col>
        <Col smOffset={3} sm={6}>
          <OAuthButton provider="facebook"><i className="fa fa-facebook-official" aria-hidden="true"></i> Login with Facebook</OAuthButton>
        </Col>
      </FormGroup>
    </Form>
  );

};

export default LoginForm;
