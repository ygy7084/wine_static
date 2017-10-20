import React from 'react';

import {
  KYTableD,
  KYButton,
} from './ky-table';

class StoreList extends React.Component {
  render() {
    return (
      <KYTableD
        sort
        finder
        option
        list={this.props.list}
        rowClick={this.props.rowClick}
        tableToExcel={this.props.tableToExcel}
        structure={this.props.structure}
        view={[
          '영문줄임명',
          '한글줄임명',
          '빈티지',
          '매장명',
          '판매가',
          '고객명',
          '고객전화번호',
          '날짜',
          '수량',
        ]}
      >
        <KYButton
          bsStyle="primary"
          onClick={this.props.refresh}
        >새로 고침</KYButton>
        {
          this.props.deleteLock ?
            null :
            <KYButton
              bsStyle="danger"
              onClick={this.props.removeAllClick}
            >전부 삭제</KYButton>
        }
      </KYTableD>
    );
  }
}
export default StoreList;
