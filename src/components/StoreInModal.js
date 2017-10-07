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

class StoreInModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      customerListModalOn: true,
      customerInsertModalOn: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
    this.customerInsertClick = this.customerInsertClick.bind(this);
    this.customerInsert = this.customerInsert.bind(this);
    this.customerSelect = this.customerSelect.bind(this);
  }
  handleInput(item, value, name) {
    const list = JSON.parse(JSON.stringify(this.state.list));
    // 구조에 의해 index 0, 기존수량, 결과수량 위한 변경
    const key = this.props.structure.find(o => o.name === name).key[0];
    const obj = list.find(obj => obj._id === item._id);
    obj[key] = value;
    if (name === '변경수량') {
      obj.next = obj.before + parseInt(value, 10);
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
  customerInsertClick() {
    this.setState({ customerInsertModalOn: true });
  }
  customerInsert(customer) {
    const modified = JSON.parse(JSON.stringify(customer));
    if (this.props.saleList && this.props.saleList[0] && this.props.saleList[0].shop && this.props.saleList[0].shop._id) {
      modified.shop = this.props.saleList[0].shop._id;
      this.props.customerInsert(modified);
      this.setState({ customerInsertModalOn: false });
    } else {
      errorHandler({ message: '매장 정보가 없습니다.' });
    }
  }
  customerSelect(customer) {
    const list = [];
    this.props.saleList.forEach((obj) => {
      const result = this.props.storeResult.find(r =>
        r.sale._id === obj._id && r.customer._id === customer._id && r.shop._id === obj.shop._id);
      list.push({
        _id: obj._id,
        sale: obj,
        shop: obj.shop,
        customer,
        datetimeString: '',
        before: result ? result.remain : 0,
        quantityChange: 0,
        next: result ? result.remain : 0,
      });
    });
    this.setState({ list, customerListModalOn: false, });
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
        <TableModal
          show={this.state.customerListModalOn}
          title="입고 고객 선택"
          subtitle={this.props.subtitle}
          close={() => this.setState({ customerListModalOn: false })}
        >
          <CustomerList
            mode="storeIn"
            list={this.props.customerList.filter(customer =>
              this.props.saleList.find(sale => sale.shop && customer.shop && sale.shop._id === customer.shop._id)
            )}
            structure={this.props.customerStructure}
            rowClick={this.customerSelect}
            insertClick={this.customerInsertClick}
          />
        </TableModal>
        <CustomerModal
          title="고객 추가"
          mode="insert"
          show={this.state.customerInsertModalOn}
          close={() => this.setState({ customerInsertModalOn: false })}
          insert={this.customerInsert}
        />
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
