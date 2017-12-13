import React from 'react';
import {Row} from 'react-bootstrap';

import css from '../../scss/components/logo.scss';


const myLogo = () => {

  return(
    <Row>
      <div className={css.lockup}>
        <div className={css.logobox}>
          <img src="../../assets/images/iWish_icon.png" alt="placeholder thumbnail" />
        </div>
        <div className={css.textbox}>
          <h1 className={css.text}>iWish</h1>
        </div>
      </div>
    </Row>
  );
};

export default myLogo;
