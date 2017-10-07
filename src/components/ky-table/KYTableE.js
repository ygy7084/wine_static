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
  KYTableBetaForSelect,
  KYButton,
} from './';

class KYTableE extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <KYTableBetaForSelect
        {...this.props}
      />
    );
  }
}
export default KYTableE;
