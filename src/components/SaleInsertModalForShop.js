import React from 'react';
import PropTypes from 'prop-types';
import {
  TableModal,
  SaleListForInput,
} from './';

class SaleInsertModalForShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (this.props.mode === 'insert') {
      const list = [];
      this.props.vintageList.forEach(obj =>
        list.push({
          _id: obj._id,
          vintage: obj,
          shop: null,
          wholeSalePrice: 0,
          lowestPrice: 0,
          price: 0,
        }),
      );
      this.state = { list };
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
  }
  handleInput(item, value, name) {
    const list = JSON.parse(JSON.stringify(this.state.list));
    // 구조에 의해 index 0
    const key = this.props.structure.find(o => o.name === name).key[0];
    list.find(obj => obj._id === item._id)[key] = value;
    this.setState({ list });
  }
  handleInsert() {
    const inserts = [];
    this.state.list.forEach(obj =>
      inserts.push({
        vintage: obj.vintage._id,
        shop: this.props.shop,
        price: obj.price ? obj.price : 0,
        lowestPrice: obj.lowestPrice ? obj.lowestPrice : 0,
        wholeSalePrice: obj.wholeSalePrice ? obj.wholeSalePrice : 0,
      }),
    );
    if (inserts.length) {
      this.props.insert(inserts);
    }
  }
  render() {
    return (
      <div>
        <TableModal
          show={this.props.show}
          title={this.props.title}
          subtitle={this.props.subtitle}
          close={this.props.close}
          check={this.handleInsert}
          checkMessage="추가"
        >
          <SaleListForInput
            onlyView
            structure={this.props.structure}
            list={this.state.list}
            inputs={['도매가', '판매가', '최저가']}
            inputChange={this.handleInput}
          />
        </TableModal>
      </div>
    );
  }
}
SaleInsertModalForShop.propTypes = {
  show: PropTypes.bool,
  vintageList: PropTypes.array,
};
SaleInsertModalForShop.defaultProps = {
  show: true,
  vintageList: [],
};
export default SaleInsertModalForShop;