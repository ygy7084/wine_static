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
  shop,
  excel,
} from '../actions';
import {
  ShopList,
  ShopModal,
  CheckModal,
} from '../components';
import {
  loader,
  errorHandler,
  notify,
} from '../modules';
import structures from './structures';

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shopModalItem: null,
    };
    this.shopLoad = this.shopLoad.bind(this);
    this.shopClick = this.shopClick.bind(this);
    this.shopInsertClick = this.shopInsertClick.bind(this);
    this.shopInsert = this.shopInsert.bind(this);
    this.shopModify = this.shopModify.bind(this);
    this.shopRemove = this.shopRemove.bind(this);
    this.shopRemoveAll = this.shopRemoveAll.bind(this);
    this.tableToExcel = this.tableToExcel.bind(this);
  }
  componentWillMount() {
    this.shopLoad();
  }
  shopLoad() {
    loader.on();
    this.props.shopGetListRequest(
      this.props.accountSession.account.level === '매장' ?
        this.props.accountSession.account.shop : null,
    )
      .then((data) => {
        if (this.props.shopGetList.status === 'SUCCESS') {
          loader.off();
        } else if (this.props.shopGetList.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  shopClick(shop) {
    this.setState({
      shopModalItem: shop,
    });
    this.props.changePage(`${this.props.match.url}/modal`);
  }
  shopInsertClick() {
    this.props.changePage(`${this.props.match.url}/insertmodal`);
  }
  shopInsert(shop) {
    loader.on();
    this.props.shopInsertRequest(shop)
      .then((data) => {
        if (this.props.shopInsert.status === 'SUCCESS') {
          loader.off();
          notify('생성 완료');
          this.props.changePage(this.props.match.url);
          this.shopLoad();
        } else if (this.props.shopInsert.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  shopModify(shop) {
    loader.on();
    this.props.shopModifyRequest(shop)
      .then((data) => {
        if (this.props.shopModify.status === 'SUCCESS') {
          loader.off();
          notify('수정 완료');
          this.props.changePage(this.props.match.url);
          this.shopLoad();
        } else if (this.props.shopModify.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  shopRemove(shop) {
    if (this.props.accountSession.account.level === '매장') {
      errorHandler({ message: '권한이 없습니다.' });
    } else {
      loader.on();
      this.props.shopRemoveRequest(shop)
        .then((data) => {
          if (this.props.shopRemove.status === 'SUCCESS') {
            loader.off();
            notify('삭제 완료');
            this.props.changePage(this.props.match.url);
            this.shopLoad();
          } else if (this.props.shopRemove.status === 'FAILURE') {
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
  shopRemoveAll(password) {
    if (password !== this.props.accountSession.account.password) {
      errorHandler({ message: '잘못된 패스워드입니다.' });
    } else {
      loader.on();
      this.props.shopRemoveAllRequest()
        .then((data) => {
          if (this.props.shopRemoveAll.status === 'SUCCESS') {
            loader.off();
            notify('삭제 완료');
            this.props.changePage(this.props.match.url);
            this.shopLoad();
          } else if (this.props.shopRemoveAll.status === 'FAILURE') {
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
        <ShopList
          onlyView={
            this.props.accountSession.account &&
            this.props.accountSession.account.level === '매장'
          }
          list={this.props.shopGetList.list}
          structure={structures.shop}
          rowClick={this.shopClick}
          insertClick={this.shopInsertClick}
          refresh={this.shopLoad}
          removeAllClick={() => this.props.changePage(`${this.props.match.url}/removeallmodal`)}
          tableToExcel={this.tableToExcel}
        />
        <Route
          path={`${this.props.match.url}/modal`}
          render={props =>
            this.state.shopModalItem ?
              <ShopModal
                title="매장 정보"
                mode="modify"
                item={this.state.shopModalItem}
                modify={this.shopModify}
                remove={this.shopRemove}
                close={() => this.props.changePage(this.props.match.url)}
              /> : <Redirect to={this.props.match.url} />
          }
        />
        <Route
          path={`${this.props.match.url}/insertmodal`}
          render={props =>
            <ShopModal
              title="매장 추가"
              mode="insert"
              item={this.state.shopModalItem}
              insert={this.shopInsert}
              close={() => this.props.changePage(this.props.match.url)}
            />
          }
        />
        <Route
          path={`${this.props.match.url}/removeallmodal`}
          render={props =>
            <CheckModal
              checkPassword
              bsStyle="danger"
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="매장이 전부 삭제됩니다. 연결된 상품도 사라집니다."
              handleCheck={this.shopRemoveAll}
              handleClose={() => this.props.changePage(this.props.match.url)}
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
  shopGetList: {
    status: state.shop.getList.status,
    list: state.shop.getList.list,
  },
  shopInsert: {
    status: state.shop.insert.status,
    shop: state.shop.insert.shop,
  },
  shopModify: {
    status: state.shop.modify.status,
  },
  shopRemove: {
    status: state.shop.remove.status,
  },
  shopRemoveAll: {
    status: state.shop.removeAll.status,
  },
  excelTableToExcel: {
    status: state.excel.tableToExcel.status,
    file: state.excel.tableToExcel.file,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  shopGetListRequest: shop.getListRequest,
  shopInsertRequest: shop.insertRequest,
  shopModifyRequest: shop.modifyRequest,
  shopRemoveRequest: shop.removeRequest,
  shopRemoveAllRequest: shop.removeAllRequest,
  excelTableToExcelReqeust: excel.tableToExcelRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shop);
