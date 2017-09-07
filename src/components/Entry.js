import React from 'react';
import { Button } from 'react-bootstrap';
import {
  Link,
} from 'react-router-dom';

const style = {
  vertical_center: {
    height: '70vh',
    display: 'flex',
    alignItems: 'center',
  },
  horizontal_center: {
    margin: '0 auto',
    width: '40%',
  },
};
const Entry = function Entry() {
  return (
    <div className="container" style={style.vertical_center}>
      <div style={style.horizontal_center}>
        <Link to="/customer">
          <Button bsStyle="primary" bsSize="large" block>
                            고객 사용 페이지
          </Button>
        </Link>
        <Link to="/manager">
          <Button bsStyle="default" bsSize="large" block>
                            관리자 페이지
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Entry;
