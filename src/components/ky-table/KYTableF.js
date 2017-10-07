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
  KYTableBetaForInput,
  KYButton,
} from './';

class KYTableF extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <KYTableBetaForInput
        {...this.props}
      />
    );
  }
}
export default KYTableF;
