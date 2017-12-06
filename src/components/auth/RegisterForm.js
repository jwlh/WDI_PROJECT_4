import React from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';

const RegisterForm = ({ handleChange, handleSubmit, user, errors }) => {
  return (

    <Form horizontal onSubmit={handleSubmit}>
      <FormGroup controlId="firstName">
        <Col componentClass={ControlLabel} sm={2}>
          First Name
        </Col>
        <Col sm={10}>
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
        <Col componentClass={ControlLabel} sm={2}>
          Last Name
        </Col>
        <Col sm={10}>
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
        <Col componentClass={ControlLabel} sm={2}>
          Username
        </Col>
        <Col sm={10}>
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
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <Col sm={10}>
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
        <Col componentClass={ControlLabel} sm={2}>
          Password
        </Col>
        <Col sm={10}>
          <FormControl
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={user.password}
          />
        </Col>
      </FormGroup>
      <FormGroup controlId="formHorizontalConfirmPassword">
        <Col componentClass={ControlLabel} sm={2}>
          Confirm Password
        </Col>
        <Col sm={10}>
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
        <Col smOffset={2} sm={10}>
          <Button type="submit">
            Register
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default RegisterForm;
