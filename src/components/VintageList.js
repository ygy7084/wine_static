import React from 'react';

import {
  KYTableD,
  KYButton,
} from './ky-table';

class VintageList extends React.Component {
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
        view={[
          '영문줄임명',
          '한글줄임명',
          '종류',
          '원산지',
          '품종',
          '빈티지',
        ]}
      >
        {
          this.props.onlyView ?
            undefined :
            [
              <KYButton
                key="insert"
                bsStyle="success"
                onClick={this.props.insertClick}
              >빈티지 추가</KYButton>,
              <KYButton
                key="modify"
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
export default VintageList;
