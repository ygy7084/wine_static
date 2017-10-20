import React from 'react';

import {
  KYTableD,
  KYButton,
} from './ky-table';

class OriginalList extends React.Component {
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
        excelToTable={this.props.excelToTable}
        tableFromExcel={this.props.tableFromExcel}
        insertTableFromExcel={this.props.insertTableFromExcel}
        excelSampleDownload={this.props.excelSampleDownload}
        view={['영문줄임명', '한글줄임명', '종류', '원산지', '품종']}
        tableFromExcelView={['영문줄임명', '한글줄임명', '영문풀네임', '한글풀네임']}
      >
        {
          this.props.onlyView ?
            undefined : [
              <KYButton
                key="insert"
                bsStyle="success"
                onClick={this.props.insertClick}
              >오리지날 추가</KYButton>,
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
export default OriginalList;
