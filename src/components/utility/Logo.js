import React from 'react';
import {Row, Col} from 'react-bootstrap';

import LogoSvg from './LogoSvg';



const myLogo = () => {

  return(
    <Row>
      <Col xs={12}>
        <LogoSvg />
      </Col>
    </Row>
  );
};

export default myLogo;
