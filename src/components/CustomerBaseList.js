import React from 'react';

import {
  KYTableD,
  KYButton,
} from './ky-table';

class CustomerBaseList extends React.Component {
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
        view={['이름', '전화번호', '이메일', '주소', '등급']}
      >
        <KYButton
          bsStyle="success"
          onClick={this.props.insertClick}
        >고객 추가</KYButton>
        <KYButton
          bsStyle="primary"
          onClick={this.props.refresh}
        >새로 고침</KYButton>
        <KYButton
          bsStyle="danger"
          onClick={this.props.removeAllClick}
        >전부 삭제</KYButton>
      </KYTableD>
    );
  }
}

export default CustomerBaseList;
