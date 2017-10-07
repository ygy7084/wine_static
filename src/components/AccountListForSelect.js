import React from 'react';

import {
  KYTableE,
  KYButton,
} from './ky-table';

class AccountList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    return (
      <KYTableE
        sort
        finder
        option
        list={this.props.list}
        selectedItems={this.props.selectedItems}
        rowClick={this.props.rowClick}
        rowSelect={this.props.rowSelect}
        outputTable={this.props.outputTable}
        structure={this.props.structure}
        view={['ID', '이름', '권한', '매장명']}
      >
      </KYTableE>
    );
  }
}

export default AccountList;
