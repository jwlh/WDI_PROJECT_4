import React from 'react';
import { Button } from 'react-bootstrap';

const BackButton = ({ history }) => {
  return (
    <Button onClick={history.goBack}>
      Back
    </Button>
  );
};

export default BackButton;
