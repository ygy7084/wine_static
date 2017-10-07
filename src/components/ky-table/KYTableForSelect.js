import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Pagination } from 'react-bootstrap';
import {
  KYButton,
  KYButtonGroup,
  KYListSizeSelector,
  KYFinder,
  KYListForSelect,
  KYSettings,
} from './';

const styles = {
  grid: {
    margin: '0px',
    padding: '0px',
  },
  paginator: {
    marginTop: '10px',
    textAlign: 'center',
  },
};
class KYTableForSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      listSize: this.props.listSizes[0],
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleListSizeSelect = this.handleListSizeSelect.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.list) !==
      JSON.stringify(nextProps.list)) {
      this.setState({
        activePage: 1,
      });
    }
  }
  handleSelect(value) {
    this.setState({ activePage: value });
  }
  handleListSizeSelect(v) {
    this.setState({
      listSize: v,
      activePage: 1,
    });
  }
  render() {
    const startIndex = (this.state.activePage - 1) * this.state.listSize;
    const showList = this.props.list.slice(
      startIndex,
      startIndex + this.state.listSize);
    const nested = {
      insideKYButtonGroup: [],
      rightButtons: [],
    };
    nested.insideKYButtonGroup.push(
      <KYListSizeSelector
        key={'KYListSizeSelector'}
        value={this.state.listSize}
        numbers={this.props.listSizes}
        onClick={this.handleListSizeSelect}
      />,
    );
    if (this.props.children) {
      let temp = this.props.children;
      if (!Array.isArray(temp)) {
        temp = [temp];
      }
      temp.forEach((child) => {
        if (child && typeof child === 'object') {
          if (child.type === KYButton) {
            nested.insideKYButtonGroup.push(child);
          } else if (child.type === KYFinder || child.type === KYSettings) {
            nested.rightButtons.push(child);
          }
        }
      });
    }
    return (
      <div>
        <KYButtonGroup>
          {nested.insideKYButtonGroup}
        </KYButtonGroup>
        {nested.rightButtons}
        <KYListForSelect
          truncate={this.props.truncate}
          colClick={this.props.colClick}
          rowClick={this.props.rowClick ? num => this.props.rowClick(num + startIndex) : null}
          rowSelect={this.props.rowSelect ? num => this.props.rowSelect(num + startIndex) : null}
          startNumber={startIndex + 1}
          selectedIndexes={
            this.props.selectedIndexes
              .filter(i =>
                i < startIndex + this.state.listSize && i >= startIndex)
              .map(i => i - startIndex)
          }
          cols={this.props.cols}
          rows={showList}
        />
        <div style={styles.paginator}>
          <Pagination
            bsSize="medium"
            items={Math.ceil(this.props.list.length / this.state.listSize)}
            maxButtons={this.props.maxPageButtons}
            activePage={this.state.activePage}
            onSelect={this.handleSelect}
            prev
            next
            first
            last
          />
        </div>
      </div>
    );
  }
}
KYTableForSelect.propTypes = {
  truncate: PropTypes.bool,
  listSizes: PropTypes.arrayOf(PropTypes.number),
  list: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))),
  colClick: PropTypes.func,
  rowClick: PropTypes.func,
  rowSelect: PropTypes.func,
  cols: PropTypes.arrayOf(PropTypes.string),
  maxPageButtons: PropTypes.number,
  selectedIndexes: PropTypes.arrayOf(PropTypes.number),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
KYTableForSelect.defaultProps = {
  truncate: false,
  listSizes: [10, 20, 50, 100],
  list: [['list']],
  colClick: undefined,
  rowClick: undefined,
  rowSelect: undefined,
  cols: ['col'],
  maxPageButtons: 5,
  selectedIndexes: [],
  children: undefined,
};
export default Radium(KYTableForSelect);
