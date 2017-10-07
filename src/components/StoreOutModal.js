import React from 'react';
import PropTypes from 'prop-types';
import {
  TableModal,
  StoreListForInput,
  CustomerList,
  CustomerModal,
} from './';
import {
  errorHandler,
} from '../modules';

class StoreOutModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      customerListModalOn: true,
      customerInsertModalOn: false,
    };
    if (this.props.storeResult) {
      this.props.storeResult.forEach((r) => {
        this.state.list.push({
          _id: r._id,
          sale: r.sale,
          shop: r.shop,
          customer: r.customer,
          datetimeString: '',
          before: r.remain,
          quantityChange: 0,
          next: r.remain,
        });
      });
    }
    console.log(this.state.list);
    this.handleInput = this.handleInput.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
  }
  handleInput(item, value, name) {
    const list = JSON.parse(JSON.stringify(this.state.list));
    // 구조에 의해 index 0, 기존수량, 결과수량 위한 변경
    const key = this.props.structure.find(o => o.name === name).key[0];
    const obj = list.find(obj => obj._id === item._id);
    obj[key] = value;
    if (name === '변경수량') {
      obj.next = obj.before - parseInt(value, 10);
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
        quantityChange: -1 * parseInt(obj.quantityChange, 10),
      }),
    );
    if (inserts.length) {
      this.props.insert(inserts);
    }
  }
  render() {
    const storeNewStructure = JSON.parse(JSON.stringify(this.props.structure));
    storeNewStructure.splice(
      storeNewStructure.findIndex(o => o.name === '변경수량'), 0,
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
            inputs={['변경수량']}
            inputChange={this.handleInput}
          />
        </TableModal>
      </div>
    );
  }
}
StoreOutModal.propTypes = {
  show: PropTypes.bool,
};
StoreOutModal.defaultProps = {
  show: true,
};
export default StoreOutModal;
