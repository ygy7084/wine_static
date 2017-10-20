import React from 'react';

import {
  KYTableE,
} from './ky-table';

class AccountList extends React.Component {
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
        view={['ID', '이름', '권한', '매장명']}
      >
      </KYTableE>
    );
  }
}

export default AccountList;
