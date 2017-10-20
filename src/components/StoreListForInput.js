import React from 'react';

import {
  KYTableF,
} from './ky-table';

class StoreListForInput extends React.Component {
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
          '수량',
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
