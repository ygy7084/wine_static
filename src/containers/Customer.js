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
  customer,
  excel,
} from '../actions';
import {
  CustomerList,
  CustomerModal,
  CheckModal,
} from '../components';
import {
  loader,
  errorHandler,
} from '../modules';
import structures from './structures';

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerModalItem: null,
    };
    this.customerLoad = this.customerLoad.bind(this);
    this.customerClick = this.customerClick.bind(this);
    this.customerInsertClick = this.customerInsertClick.bind(this);
    this.customerInsert = this.customerInsert.bind(this);
    this.customerModify = this.customerModify.bind(this);
    this.customerRemove = this.customerRemove.bind(this);
    this.customerRemoveAll = this.customerRemoveAll.bind(this);
    this.tableToExcel = this.tableToExcel.bind(this);
  }
  componentWillMount() {
    this.customerLoad();
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
  customerClick(customer) {
    this.setState({
      customerModalItem: customer,
    });
    this.props.changePage('/customer/modal');
  }
  customerInsertClick() {
    this.props.changePage('/customer/insertmodal');
  }
  customerInsert(customer) {
    if (this.props.accountSession.account &&
        this.props.accountSession.account.shop) {
      loader.on();
      const modified = JSON.parse(JSON.stringify(customer));
      modified.shop = this.props.accountSession.account.shop;
      this.props.customerInsertRequest(modified)
        .then((data) => {
          if (this.props.customerInsert.status === 'SUCCESS') {
            loader.off();
            this.props.changePage('/customer');
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
    } else {
      errorHandler({ message: '매장 정보가 없습니다.' });
    }
  }
  customerModify(customer) {
    loader.on();
    this.props.customerModifyRequest(customer)
      .then((data) => {
        if (this.props.customerModify.status === 'SUCCESS') {
          loader.off();
          this.props.changePage('/customer');
          this.customerLoad();
        } else if (this.props.customerModify.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  customerRemove(customer) {
    loader.on();
    this.props.customerRemoveRequest(customer)
      .then((data) => {
        if (this.props.customerRemove.status === 'SUCCESS') {
          loader.off();
          this.props.changePage('/customer');
          this.customerLoad();
        } else if (this.props.customerRemove.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  customerRemoveAll() {
    loader.on();
    this.props.customerRemoveAllRequest(
      this.props.accountSession.account.level === '매장' ?
        this.props.accountSession.account.shop : null)
      .then((data) => {
        if (this.props.customerRemoveAll.status === 'SUCCESS') {
          loader.off();
          this.props.changePage('/customer');
          this.customerLoad();
        } else if (this.props.customerRemoveAll.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
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
        <CustomerList
          list={this.props.customerGetList.list}
          structure={structures.customer}
          rowClick={this.customerClick}
          insertClick={this.customerInsertClick}
          removeAllClick={() => this.props.changePage('/customer/removeallmodal')}
          refresh={this.customerLoad}
          tableToExcel={this.tableToExcel}
        />
        <Route
          path="/customer/modal"
          render={props =>
            this.state.customerModalItem ?
              <CustomerModal
                title="고객 정보"
                mode="modify"
                close={() => this.props.changePage('/customer')}
                item={this.state.customerModalItem}
                modify={this.customerModify}
                remove={this.customerRemove}
              /> : <Redirect to="/customer" />
          }
        />
        <Route
          path="/customer/insertmodal"
          render={props =>
            <CustomerModal
              title="고객 추가"
              mode="insert"
              close={() => this.props.changePage('/customer')}
              insert={this.customerInsert}
            />
          }
        />
        <Route
          path="/customer/removeallmodal"
          render={props =>
            <CheckModal
              bsStyle="danger"
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="고객과 연결된 입출고 리스트가 전부 삭제됩니다.."
              handleCheck={this.customerRemoveAll}
              handleClose={() => this.props.changePage('/customer')}
            />
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
  customerGetList: {
    status: state.customer.getList.status,
    list: state.customer.getList.list,
  },
  customerInsert: {
    status: state.customer.insert.status,
    customer: state.customer.insert.customer,
  },
  customerModify: {
    status: state.customer.modify.status,
  },
  customerRemove: {
    status: state.customer.remove.status,
  },
  customerRemoveAll: {
    status: state.customer.removeAll.status,
  },
  excelTableToExcel: {
    status: state.excel.tableToExcel.status,
    file: state.excel.tableToExcel.file,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  customerGetListRequest: customer.getListRequest,
  customerInsertRequest: customer.insertRequest,
  customerModifyRequest: customer.modifyRequest,
  customerRemoveRequest: customer.removeRequest,
  customerRemoveAllRequest: customer.removeAllRequest,
  excelTableToExcelReqeust: excel.tableToExcelRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customer);
