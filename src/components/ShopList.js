import React from 'react';

import {
  KYTableD,
  KYButton,
} from './ky-table';

class ShopList extends React.Component {
  render() {
    return (
      <KYTableD
        sort
        finder
        option
        truncate
        list={this.props.list}
        rowClick={this.props.rowClick}
        tableToExcel={this.props.tableToExcel}
        structure={this.props.structure}
        view={['이름', '전화번호', '메모']}
      >
        {
          this.props.onlyView ?
            undefined : [
              <KYButton
                key="insert"
                bsStyle="success"
                onClick={this.props.insertClick}
              >매장 추가</KYButton>,
              <KYButton
                key="refresh"
                bsStyle="primary"
                onClick={this.props.refresh}
              >새로 고침</KYButton>,
              <KYButton
                key="danger"
                bsStyle="danger"
                onClick={this.props.removeAllClick}
              >전부 삭제</KYButton>,
            ]
        }
      </KYTableD>
    );
  }
}
export default ShopList;
