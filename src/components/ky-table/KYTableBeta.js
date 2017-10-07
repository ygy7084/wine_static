import React from 'react';
import PropTypes from 'prop-types';
import {
  objectKeyFollower,
  listFinder,
} from './lib';

import {
  KYTable,
  KYFinder,
  KYButton,
  KYModal,
} from './';

/*
alpha에서 option 넣음
밑에 listfy에 들어갈 때 props.view가 아닌 state.view가 들어간다.
 */
class KYTableBeta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list,
      sort: null,
      asc: false,
      view: this.props.view,
      optionModalOn: false,
      optionModalOnAnother: false,
    };
    this.handleSort = this.handleSort.bind(this);
    this.listify = this.listify.bind(this);
    this.find = this.find.bind(this);
    this.selectCol = this.selectCol.bind(this);
    this.outputTable = this.outputTable.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.list) !== JSON.stringify(this.props.list)) {
      this.setState({
        list: nextProps.list,
        sort: null,
        asc: false,
      });
    }
  }
  handleSort(colName) {
    const key = this.props.structure.find(c => c.name === colName).key;
    const list = JSON.parse(JSON.stringify(this.state.list));
    list.sort((a, b) => {
      const at = String(objectKeyFollower(a, key)).toUpperCase();
      const bt = String(objectKeyFollower(b, key)).toUpperCase();
      if (!at) {
        if (!bt) {
          return 0;
        }
        return this.state.sort === colName ? -1 : 1;
      }
      if (!bt) {
        return this.state.sort === colName ? 1 : -1;
      }
      if (at > bt) {
        return this.state.sort === colName ? 1 : -1;
      } else if (at < bt) {
        return this.state.sort === colName ? -1 : 1;
      }
      return 0;
    });
    if (this.state.sort === colName) {
      this.setState({ list, sort: null });
    } else {
      this.setState({ list, sort: colName });
    }
  }
  listify(list, structure, view) {
    const rows = [];
    let cols = [];
    if (list) {
      const filtered = [];
      structure.forEach((s) => {
        const index = view.findIndex(v => s.name === v);
        if (index > -1) {
          filtered.push(s);
        }
      });
      cols = filtered.map(obj => obj.name);
      list.forEach((item) => {
        const t = [];
        filtered.forEach((obj) => {
          t.push(objectKeyFollower(item, obj.key));
        });
        rows.push(t);
      });
    }
    return { cols, rows };
  }
  find(input) {
    const list = listFinder(
      this.props.list,
      this.props.structure.find(obj => obj.name === input.filter) ?
        this.props.structure.find(obj => obj.name === input.filter).key : null,
      input.input,
    );
    this.setState({ list });
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
  outputTable() {
    this.props.outputTable(this.listify(this.state.list, this.props.structure, this.state.view));
  }
  render() {
    const { cols, rows } = this.listify(this.state.list, this.props.structure, this.state.view);
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
          truncate={this.props.truncate}
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
          {
            this.props.outputTable ?
              <div>
                <KYButton
                  value="엑셀 출력"
                  block
                  onClick={this.outputTable}
                />
              </div> : null
          }
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
KYTableBeta.propTypes = {
  truncate: PropTypes.bool,
  list: PropTypes.arrayOf(PropTypes.object),
  sort: PropTypes.bool,
  finder: PropTypes.bool,
  option: PropTypes.bool,
  structure: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    key: PropTypes.arrayOf(PropTypes.string),
  })),
  view: PropTypes.arrayOf(PropTypes.string),
  colClick: PropTypes.func,
  rowClick: PropTypes.func,
  outputTable: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
KYTableBeta.defaultProps = {
  truncate: false,
  list: [{}],
  sort: false,
  finder: false,
  option: false,
  structure: [{}],
  view: [],
  colClick: undefined,
  rowClick: undefined,
  outputTable: undefined,
  children: undefined,
};
export default KYTableBeta;
