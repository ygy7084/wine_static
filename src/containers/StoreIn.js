import React from 'react';
import fileDownload from 'react-file-download';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import {
  sale,
  store,
  customer,
  excel,
} from '../actions';
import {
  SaleModal,
  SaleListForSelect,
  StoreInModal,
} from '../components';
import {
  loader,
  errorHandler,
} from '../modules';
import structures from './structures';

class StoreIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saleModalItem: null,
      selectedSales: [],
    };
    this.saleLoad = this.saleLoad.bind(this);
    this.customerLoad = this.customerLoad.bind(this);
    this.storeLoad = this.storeLoad.bind(this);
    this.saleClick = this.saleClick.bind(this);
    this.saleSelect = this.saleSelect.bind(this);
    this.storeInsertClick = this.storeInsertClick.bind(this);
    this.storeBulkInsert = this.storeBulkInsert.bind(this);
    this.customerInsert = this.customerInsert.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.tableToExcel = this.tableToExcel.bind(this);
  }
  componentWillMount() {
    this.saleLoad();
    this.storeLoad();
    this.customerLoad();
  }
  saleLoad() {
    loader.on();
    this.props.saleGetListRequest(
      this.props.accountSession.account.level === '매장' ?
        this.props.accountSession.account.shop : null,
    )
      .then((data) => {
        if (this.props.saleGetList.status === 'SUCCESS') {
          this.setState({
            selectedSales: [],
          });
          loader.off();
        } else if (this.props.saleGetList.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  customerLoad() {
    loader.on();
    this.props.customerGetListRequest(
      this.props.accountSession.account.level === '매장' ?
        this.props.accountSession.account.shop : null)
      .then((data) => {
        if (this.props.customerGetList.status === 'SUCCESS') {
          loader.off();
        } else if (this.props.customerGetList.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  storeLoad() {
    loader.on();
    this.props.storeGetListRequest(
      this.props.accountSession.account.level === '매장' ?
        this.props.accountSession.account.shop : null)
      .then((data) => {
        if (this.props.storeGetList.status === 'SUCCESS') {
          this.setState({
            selectedSales: [],
          });
          loader.off();
        } else if (this.props.storeGetList.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  saleClick(sale) {
    this.setState({
      saleModalItem: sale,
    });
    this.props.changePage('/storein/salemodal');
  }
  saleSelect(sale) {
    const found = this.state.selectedSales.findIndex(obj => obj._id === sale._id);
    const newSale = JSON.parse(JSON.stringify(this.state.selectedSales));
    if (found > -1) {
      newSale.splice(found, 1);
    } else {
      newSale.push(sale);
    }
    this.setState({ selectedSales: newSale });
  }
  storeInsertClick() {
    const map = new Map();
    this.state.selectedSales.forEach(o => map.set(o.shop._id, o));
    if (map.size === 1) {
      this.props.changePage('/storein/insertmodal');
    } else {
      errorHandler({ message: '매장이 선택되지 않았거나 동시에 여러 매장이 존재합니다.' });
    }
  }
  storeBulkInsert(stores) {
    loader.on();
    this.props.storeBulkInsertRequest(stores)
      .then((data) => {
        if (this.props.storeBulkInsert.status === 'SUCCESS') {
          this.props.changePage('/storein');
          this.storeLoad();
          loader.off();
        } else if (this.props.storeBulkInsert.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  customerInsert(customer) {
    loader.on();
    this.props.customerInsertRequest(customer)
      .then((data) => {
        if (this.props.customerInsert.status === 'SUCCESS') {
          loader.off();
          this.customerLoad();
        } else if (this.props.customerInsert.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  selectAll() {
    this.setState({ selectedSales: this.props.saleGetList.list });
  }
  tableToExcel(table) {
    loader.on();
    this.props.excelTableToExcelReqeust(table)
      .then((data) => {
        if (this.props.excelTableToExcel.status === 'SUCCESS') {
          loader.off();
          fileDownload(this.props.excelTableToExcel.file, 'data.xlsx');
        } else {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  render() {
    return (
      <div>
        <SaleListForSelect
          mode="storeIn"
          list={this.props.saleGetList.list}
          selectedItems={this.state.selectedSales}
          rowClick={this.saleClick}
          rowSelect={this.saleSelect}
          tableToExcel={this.tableToExcel}
          structure={structures.sale}
          refresh={this.saleLoad}
          insertClick={this.storeInsertClick}
          cancelSelected={() => this.setState({ selectedSales: [] })}
          selectAll={this.selectAll}
        />
        <Route
          path="/storein/salemodal"
          render={props =>
            this.state.saleModalItem ?
              <SaleModal
                onlyView
                imageView
                mode="modify"
                close={() => this.props.changePage('/storein')}
                item={this.state.saleModalItem}
              /> : <Redirect to="/storein" />
          }
        />
        <Route
          path="/storein/insertmodal"
          render={props =>
            this.props.accountSession.account ?
              <StoreInModal
                title={'입고 진행'}
                subtitle={`${this.state.selectedSales.length}개 상품을 입고합니다.`}
                mode="insert"
                structure={structures.store}
                saleList={this.state.selectedSales}
                saleStructure={structures.sale}
                customerStructure={structures.customer}
                customerList={this.props.customerGetList.list}
                customerInsert={this.customerInsert}
                insert={this.storeBulkInsert}
                storeResult={this.props.storeGetList.result}
                close={() => this.props.changePage('/storein')}
              /> : <Redirect to="/storein" />
          }
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  accountSession: {
    status: state.account.session.status,
    account: state.account.session.account,
  },
  saleGetList: {
    status: state.sale.getList.status,
    list: state.sale.getList.list,
  },
  customerGetList: {
    status: state.customer.getList.status,
    list: state.customer.getList.list,
  },
  customerInsert: {
    status: state.customer.insert.status,
    customer: state.customer.insert.customer,
  },
  storeGetList: {
    status: state.store.getList.status,
    list: state.store.getList.list,
    result: state.store.getList.result,
  },
  storeBulkInsert: {
    status: state.store.bulkInsert.status,
  },
  excelTableToExcel: {
    status: state.excel.tableToExcel.status,
    file: state.excel.tableToExcel.file,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  saleGetListRequest: sale.getListRequest,
  customerGetListRequest: customer.getListRequest,
  customerInsertRequest: customer.insertRequest,
  storeGetListRequest: store.getListRequest,
  storeBulkInsertRequest: store.bulkInsertRequest,
  excelTableToExcelReqeust: excel.tableToExcelRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoreIn);
