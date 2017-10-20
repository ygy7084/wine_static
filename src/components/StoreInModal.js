import React from 'react';
import PropTypes from 'prop-types';
import {
  TableModal,
  StoreListForInput,
} from './';

class StoreInModal extends React.Component {
  constructor(props) {
    super(props);
    const list = [];
    this.props.saleList.forEach((obj) => {
      const result = this.props.storeResult.find(r =>
        r.sale._id === obj._id && r.customer._id === this.props.customer._id && r.shop._id === obj.shop._id);
      list.push({
        _id: obj._id,
        sale: obj,
        shop: obj.shop,
        customer: this.props.customer,
        datetimeString: '',
        before: result ? result.remain : 0,
        quantityChange: 0,
        next: result ? result.remain : 0,
      });
    });
    this.state = {
      list,
    };
    this.handleNumberInput = this.handleNumberInput.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
  }
  handleNumberInput(value) {
    let v = parseInt(value.replace(/\D/g, ''), 10);
    if (!v || value < 0) {
      v = 0;
    }
    return v;
  }
  handleInput(item, value, name) {
    const list = JSON.parse(JSON.stringify(this.state.list));
    // 구조에 의해 index 0, 기존수량, 결과수량 위한 변경
    const key = this.props.structure.find(o => o.name === name).key[0];
    const obj = list.find(obj => obj._id === item._id);
    let v = value;
    if (name === '수량') {
      v = this.handleNumberInput(value);
    }
    obj[key] = v;
    if (name === '수량') {
      obj.next = obj.before + parseInt(v, 10);
    }
    this.setState({ list });
  }
  handleInsert() {
    const inserts = [];
    this.state.list.forEach(obj =>
      inserts.push({
        sale: obj.sale,
        shop: obj.shop,
        customer: obj.customer,
        quantityChange: obj.quantityChange,
      }),
    );
    if (inserts.length) {
      this.props.insert(inserts);
    }
  }
  render() {
    const storeNewStructure = JSON.parse(JSON.stringify(this.props.structure));
    storeNewStructure.splice(
      storeNewStructure.findIndex(o => o.name === '수량'), 0,
      {
        name: '기존수량',
        key: ['before'],
      });
    storeNewStructure.push({
      name: '결과수량',
      key: ['next'],
    });
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
          <StoreListForInput
            structure={storeNewStructure}
            list={this.state.list}
            inputs={['수량']}
            inputChange={this.handleInput}
          />
        </TableModal>
      </div>
    );
  }
}
StoreInModal.propTypes = {
  show: PropTypes.bool,
};
StoreInModal.defaultProps = {
  show: true,
};
export default StoreInModal;
