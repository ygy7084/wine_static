import React from 'react';
import PropTypes from 'prop-types';
import {
  objectKeyFollower,
  listFinder,
} from './lib';

import {
  KYTableForSelect,
  KYFinder,
  KYButton,
  KYModal,
} from './';

class KYTableBetaForSelect extends React.Component {
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
    this.listifyForSelected = this.listifyForSelected.bind(this);
    this.find = this.find.bind(this);
    this.selectCol = this.selectCol.bind(this);
    this.tableToExcel = this.tableToExcel.bind(this);
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
  listifyForSelected(list, structure, view, selectedItems) {
    const rows = [];
    let cols = [];
    const selectedIndexes = [];
    if (list) {
      const filtered = [];
      structure.forEach((s) => {
        const index = view.findIndex(v => s.name === v);
        if (index > -1) {
          filtered.push(s);
        }
      });
      cols = filtered.map(obj => obj.name);
      list.forEach((item, i) => {
        const t = [];
        filtered.forEach((obj) => {
          t.push(objectKeyFollower(item, obj.key));
        });
        const found = selectedItems.findIndex(i => i._id === item._id);
        if (found > -1) {
          selectedIndexes.push(i);
        }
        rows.push(t);
      });
    }
    return { cols, rows, selectedIndexes };
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
  tableToExcel() {
    this.props.tableToExcel(
      this.listifyForSelected(
        this.state.list,
        this.props.structure,
        this.state.view,
        this.props.selectedItems,
      ));
  }
  render() {
    const { cols, rows, selectedIndexes } = this.listifyForSelected(
      this.state.list, this.props.structure, this.state.view, this.props.selectedItems);
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
        <KYTableForSelect
          truncate={this.props.truncate}
          cols={cols}
          list={rows}
          selectedIndexes={selectedIndexes}
          colClick={this.props.colClick ? this.props.colClick :
            this.props.sort ? this.handleSort : null}
          rowClick={this.props.rowClick ? index => this.props.rowClick(this.state.list[index]) : null}
          rowSelect={this.props.rowSelect ? index => this.props.rowSelect(this.state.list[index]) : null}
        >
          {children}
        </KYTableForSelect>
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
            this.props.tableToExcel ?
              <div>
                <KYButton
                  value="엑셀 출력"
                  block
                  onClick={this.tableToExcel}
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
KYTableBetaForSelect.propTypes = {
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
  rowSelect: PropTypes.func,
  tableToExcel: PropTypes.func,
  selectedItems: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
KYTableBetaForSelect.defaultProps = {
  truncate: false,
  list: [{}],
  sort: false,
  finder: false,
  option: false,
  structure: [{}],
  view: [],
  colClick: undefined,
  rowClick: undefined,
  rowSelect: undefined,
  tableToExcel: undefined,
  selectedItems: [],
  children: undefined,
};
export default KYTableBetaForSelect;
