import React from 'react';

import {
  KYTableD,
  KYButton,
} from './ky-table';

class AccountList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <KYTableD
        sort
        finder
        option
        list={this.props.list}
        rowClick={this.props.rowClick}
        outputTable={this.props.outputTable}
        structure={this.props.structure}
        view={['ID', '이름', '권한', '매장명']}
      >
        <KYButton
          bsStyle="success"
          onClick={this.props.insertClick}
        >계정 추가</KYButton>
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

export default AccountList;
