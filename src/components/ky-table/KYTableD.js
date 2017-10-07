import React from 'react';
import PropTypes from 'prop-types';
import {
  objectKeyFollower,
  listFinder,
} from './lib';

import {
  KYTable,
  KYFinder,
  KYTableAlpha,
  KYTableBeta,
  KYButton,
} from './';

class KYTableD extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <KYTableBeta
        {...this.props}
      />
    );
  }
}
export default KYTableD;
