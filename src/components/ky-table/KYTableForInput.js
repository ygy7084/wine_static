import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Pagination, } from 'react-bootstrap';
import {
  KYButton,
  KYButtonGroup,
  KYListSizeSelector,
  KYFinder,
  KYListForInput,
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
class KYTableForInput extends React.Component {
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
        <KYListForInput
          truncate={this.props.truncate}
          inputs={this.props.inputs}
          colClick={this.props.colClick}
          rowClick={
            this.props.rowClick ?
              index => this.props.rowClick(index + startIndex) : null}
          inputChange={
            this.props.inputChange ?
              (index, value, name) =>
                this.props.inputChange(index + startIndex, value, name) : null
          }
          startNumber={startIndex + 1}
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
KYTableForInput.propTypes = {
  truncate: PropTypes.bool,
  listSizes: PropTypes.arrayOf(PropTypes.number),
  list: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))),
  inputs: PropTypes.arrayOf(PropTypes.string),
  colClick: PropTypes.func,
  rowClick: PropTypes.func,
  inputChange: PropTypes.func,
  cols: PropTypes.arrayOf(PropTypes.string),
  maxPageButtons: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
KYTableForInput.defaultProps = {
  truncate: false,
  listSizes: [10, 20, 50, 100],
  list: [['list']],
  inputs: [{}],
  colClick: undefined,
  rowClick: undefined,
  inputChange: undefined,
  cols: ['col'],
  maxPageButtons: 5,
  children: undefined,
};
export default Radium(KYTableForInput);
