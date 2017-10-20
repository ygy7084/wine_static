import React from 'react';
import PropTypes from 'prop-types';
import {
  KYTable,
  KYFinder,
  KYButton,
  KYModal,
} from './';

class KYTableB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: this.props.view,
      optionModalOn: false,
      optionModalOnAnother: false,
    };
    this.selectCol = this.selectCol.bind(this);
    this.outputExcel = this.outputExcel.bind(this);
  }
  selectCol(v) {
    const index = this.state.view.findIndex(o => o === v);
    const view = this.state.view.slice();
    if (index > -1) {
      view.splice(index, 1);
    } else {
      view.push(v);
    }
    this.setState({ view });
  }
  outputExcel() {
  }
  render() {
    const { cols, rows } = this.listifyForSelected(this.state.list, this.props.structure, this.state.view);
    const children = [];
    if (this.props.children) {
      let temp = this.props.children;
      if (!Array.isArray(temp)) {
        temp = [temp];
      }
      temp.forEach((child) => {
        if (child && typeof child === 'object') {
          if (child.type === KYButton) {
            children.push(child);
          }
        }
      });
    }
    if (this.props.finder) {
      children.push(
        <KYFinder
          key={'KYFinder'}
          filters={this.props.structure.map(obj => obj.name)}
          submit={this.find}
        />,
      );
    }
    if (this.props.option) {
      children.push(
        <KYButton
          key={'optionModalOn'}
          bsStyle="warning"
          value="기타"
          onClick={() => this.setState({ optionModalOn: true })}
        />,
      );
    }
    return (
      <div>
        <KYTable
          cols={cols}
          list={rows}
          colClick={this.props.colClick ? this.props.colClick :
            this.props.sort ? this.handleSort : null}
          rowClick={this.props.rowClick ? index => this.props.rowClick(this.state.list[index]) : null}
        >
          {children}
        </KYTable>
        <KYModal
          open={this.state.optionModalOn}
          close={() => this.setState({ optionModalOn: false })}
        >
          <div>
            <KYButton
              value="조회 열 설정"
              onClick={() => this.setState({ optionModalOnAnother: true})}
              block
            />
          </div>
          <div>
            <KYButton
              bsStyle="success"
              value="엑셀 출력"
              block
              onClick={this.outputExcel}
            />
          </div>
        </KYModal>
        <KYModal
          title="조회 열 설정"
          open={this.state.optionModalOnAnother}
          close={() => this.setState({ optionModalOnAnother: false })}
        >
          {
            this.props.structure.map(obj => (
              <KYButton
                key={obj.name}
                value={obj.name}
                block
                bsStyle={
                  this.state.view.find(v => v === obj.name) ?
                    'primary' : 'default'
                }
                onClick={() => this.selectCol(obj.name)}
              />
            ))
          }
        </KYModal>
      </div>
    );
  }
}
KYTableB.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  sort: PropTypes.bool,
  structure: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    key: PropTypes.arrayOf(PropTypes.string),
  })),
  view: PropTypes.arrayOf(PropTypes.string),
  colClick: PropTypes.func,
  rowClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
KYTableB.defaultProps = {
  list: [{}],
  sort: false,
  structure: [{}],
  view: [],
  colClick: undefined,
  rowClick: undefined,
  children: undefined,
};
export default KYTableB;
