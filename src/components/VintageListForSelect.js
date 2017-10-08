import React from 'react';

import {
  KYTableE,
  KYButton,
} from './ky-table';

class VintageListForSelect extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <KYTableE
        sort
        finder
        option
        list={this.props.list}
        selectedItems={this.props.selectedItems}
        rowClick={this.props.rowClick}
        rowSelect={this.props.rowSelect}
        tableToExcel={this.props.tableToExcel}
        structure={this.props.structure}
        view={[
          '영문줄임명',
          '한글줄임명',
          '종류',
          '원산지',
          '품종',
          '빈티지',
        ]}
      >
        <KYButton
          bsStyle="primary"
          onClick={this.props.refresh}
        >새로 고침</KYButton>
        <KYButton
          bsStyle="success"
          onClick={this.props.insertClick}
        >선택 상품 생성</KYButton>
        <KYButton
          bsStyle="info"
          onClick={
            this.props.selectedItems.length ?
              this.props.cancelSelected
              : this.props.selectAll
          }
        >
          {
            this.props.selectedItems.length ?
              `${this.props.selectedItems.length}개 선택 취소`
              : '전부 선택'
          }
        </KYButton>
      </KYTableE>
    );
  }
}
export default VintageListForSelect;
