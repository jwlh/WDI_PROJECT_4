import React from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';



const LoginForm = ({ handleChange, handleSubmit}) => {
  return (
    <Form horizontal onSubmit={handleSubmit}>
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
          />
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
          />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={3} sm={8}>
          <Button type="submit">
            Log In
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );

};

export default LoginForm;
