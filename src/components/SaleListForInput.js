import React from 'react';

import {
  KYTableF,
} from './ky-table';

class SaleListForInput extends React.Component {

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
          '원산지',
          '빈티지',
          '입고가',
          '판매가',
          '최저가',
        ]}
        inputs={this.props.inputs}
        inputChange={this.props.inputChange}
      >
      </KYTableF>
    );
  }
}
export default SaleListForInput;
