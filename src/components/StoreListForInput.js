import React from 'react';

import {
  KYTableD,
  KYTableF,
  KYButton,
} from './ky-table';

class StoreListForInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <KYTableF
        sort
        finder
        option
        list={this.props.list}
        structure={this.props.structure}
        view={[
          '영문줄임명',
          '한글줄임명',
          '빈티지',
          '판매가',
          '매장명',
          '고객명',
          '기존수량',
          '변경수량',
          '결과수량',
        ]}
        inputs={this.props.inputs}
        inputChange={this.props.inputChange}
      >
      </KYTableF>
    );
  }
}
export default StoreListForInput;
