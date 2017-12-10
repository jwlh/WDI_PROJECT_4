import React from 'react';
import { Button } from 'react-bootstrap';

const BackButton = ({ history }) => {
  return (
    <Button onClick={history.goBack}>
      <i className="fa fa-arrow-left" aria-hidden="true"></i>Back
    </Button>
  );
};

export default BackButton;
