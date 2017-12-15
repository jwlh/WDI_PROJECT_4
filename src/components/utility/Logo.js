import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {Link } from 'react-router-dom';
import LogoSvg from './LogoSvg';




const myLogo = () => {

  return(
    <Row>
      <Col xs={12}>
        <Link exact to='/'>
          <LogoSvg />
        </Link>
      </Col>
    </Row>
  );
};

export default myLogo;
