import React from 'react';

import {
  KYTableE,
  KYButton,
} from './ky-table';

class StoreListForSelect extends React.Component {
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
          '빈티지',
          '매장명',
          '판매가',
          '고객명',
          '고객전화번호',
          '보관수량',
        ]}
      >
        {
          this.props.mode === 'storeIn' || this.props.mode === 'storeOut' ?
            [
              <KYButton
                key="refresh"
                bsStyle="primary"
                onClick={this.props.refresh}
              >새로 고침</KYButton>,
              <KYButton
                key="storeIn"
                bsStyle="success"
                onClick={this.props.insertClick}
              >{this.props.mode === 'storeIn' ? '입고' : '출고'} 진행</KYButton>,
              <KYButton
                key="select"
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
              </KYButton>,
            ] :
            [
              <KYButton
                key="refresh"
                bsStyle="primary"
                onClick={this.props.refresh}
              >새로 고침</KYButton>,
              <KYButton
                key="modfiy"
                bsStyle="success"
                onClick={this.props.modifyClick}
              >선택 수정</KYButton>,
              <KYButton
                key="remove"
                bsStyle="danger"
                onClick={this.props.removeClick}
              >선택 삭제</KYButton>,
              <KYButton
                key="select"
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
              </KYButton>,
            ]
        }
      </KYTableE>
    );
  }
}
export default StoreListForSelect;
