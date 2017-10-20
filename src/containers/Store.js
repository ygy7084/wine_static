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
  store,
  excel,
} from '../actions';
import {
  StoreList,
  SaleModal,
  CheckModal,
} from '../components';
import {
  loader,
  notify,
  errorHandler,
} from '../modules';
import structures from './structures';

class StoreHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saleModalItem: null,
    };
    this.storeLoad = this.storeLoad.bind(this);
    this.storeClick = this.storeClick.bind(this);
    this.storeRemoveAll = this.storeRemoveAll.bind(this);
    this.tableToExcel = this.tableToExcel.bind(this);
  }
  componentWillMount() {
    this.storeLoad();
  }
  storeLoad() {
    loader.on();
    this.props.storeGetListRequest(
      this.props.accountSession.account.level === '매장' ?
        this.props.accountSession.account.shop : null)
      .then((data) => {
        if (this.props.storeGetList.status === 'SUCCESS') {
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
  storeClick(store) {
    const obj = JSON.parse(JSON.stringify(store.sale));
    obj.shop = store.shop;
    this.setState({
      saleModalItem: obj,
    });
    this.props.changePage('/store/salemodal');
  }
  storeRemoveAll(password) {
    if (password !== this.props.accountSession.account.password) {
      errorHandler({ message: '잘못된 패스워드입니다.' });
    } else {
      loader.on();
      this.props.storeRemoveAllRequest()
        .then((data) => {
          if (this.props.storeRemoveAll.status === 'SUCCESS') {
            loader.off();
            notify('삭제 완료');
            this.props.changePage('/store');
            this.storeLoad();
          } else if (this.props.storeRemoveAll.status === 'FAILURE') {
            loader.off();
            throw data;
          }
        })
        .catch((data) => {
          loader.off();
          errorHandler(data);
        });
    }
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
        <StoreList
          deleteLock={
            this.props.accountSession.account &&
              this.props.accountSession.account.level === '매장'
          }
          list={this.props.storeGetList.list}
          structure={structures.store}
          rowClick={this.storeClick}
          removeAllClick={() => this.props.changePage('/store/removeallmodal')}
          refresh={() => this.storeLoad()}
          tableToExcel={this.tableToExcel}
        />
        <Route
          path="/store/removeallmodal"
          render={props =>
            <CheckModal
              checkPassword
              bsStyle="danger"
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="입출고 데이터가 전부 삭제됩니다. "
              handleCheck={this.storeRemoveAll}
              handleClose={() => this.props.changePage('/store')}
            />
          }
        />
        <Route
          path="/store/salemodal"
          render={props =>
            this.state.saleModalItem ?
              <SaleModal
                onlyView
                imageView
                mode="modify"
                close={() => this.props.changePage('/store')}
                item={this.state.saleModalItem}
              /> : <Redirect to="/store" />
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
  storeGetList: {
    status: state.store.getList.status,
    list: state.store.getList.list,
    result: state.store.getList.result,
  },
  storeRemoveAll: {
    status: state.store.removeAll.status,
  },
  excelTableToExcel: {
    status: state.excel.tableToExcel.status,
    file: state.excel.tableToExcel.file,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  storeGetListRequest: store.getListRequest,
  storeRemoveAllRequest: store.removeAllRequest,
  excelTableToExcelReqeust: excel.tableToExcelRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoreHistory);
