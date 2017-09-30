import React from 'react';
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
  shop,
} from '../actions';

import {
  TableModal,
  SaleList,
  ShopList,
  CustomerList,
  StoreList,
  StoreModal,
  StoreOutModal,
  StoreInsertModal,
  RemoveModal,
} from '../components';

import {
  loader,
  errorHandler,
} from '../modules';

class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeModalItem: null,
      saleItem: null,
      shopItem: null,
      customerItem: null,
      bulk: [],
    };
    this.shopLoad = this.shopLoad.bind(this);
    this.customerLoad = this.customerLoad.bind(this);
    this.shopClick = this.shopClick.bind(this);
    this.shopUnClick = this.shopUnClick.bind(this);
    this.shopSelectClick = this.shopSelectClick.bind(this);
    this.customerSelectClick = this.customerSelectClick.bind(this);
    this.customerClick = this.customerClick.bind(this);
    this.saleLoad = this.saleLoad.bind(this);
    this.storeLoad = this.storeLoad.bind(this);
    this.storeClick = this.storeClick.bind(this);
    this.saleClick = this.saleClick.bind(this);
    this.storeInsert = this.storeInsert.bind(this);
    this.storeBulkInsert = this.storeBulkInsert.bind(this);
    this.storeModify = this.storeModify.bind(this);
    this.storeRemove = this.storeRemove.bind(this);
    this.storeRemoveAll = this.storeRemoveAll.bind(this);
    this.changeStoreBulk = this.changeStoreBulk.bind(this);
  }
  componentWillMount() {
    this.storeLoad();
    this.customerLoad();
    this.saleLoad();
    this.shopLoad();
  }
  shopLoad() {
    loader.on();
    this.props.shopGetListRequest(
      this.props.accountSession.account.level === '매장' ?
        this.props.accountSession.account.shop : null
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
  customerLoad() {
    loader.on();
    this.props.customerGetListRequest(
      this.props.accountSession.account.level === '매장' ?
        this.props.accountSession.account.shop : null
    )
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
  saleLoad() {
    loader.on();
    this.props.saleGetListRequest(
      this.props.accountSession.account.level === '매장' ?
        this.props.accountSession.account.shop : null
    )
      .then((data) => {
        if (this.props.saleGetList.status === 'SUCCESS') {
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
  storeLoad() {
    loader.on();
    this.props.storeGetListRequest(
      this.props.accountSession.account.level === '매장' ?
        this.props.accountSession.account.shop : null
    )
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
  shopClick(shop, url) {
    this.setState({ shopItem: shop });
    this.props.changePage(url);
  }
  customerClick(shop, url) {
    this.setState({ customerItem: shop });
    this.props.changePage(url);
  }
  shopSelectClick(url) {
    this.shopLoad();
    this.setState({ shopItem: null });
    this.props.changePage(url);
  }
  customerSelectClick(url) {
    this.customerLoad();
    this.setState({ customerItem: null });
    this.props.changePage(url);
  }
  shopUnClick() {
    this.setState({ shopItem: null });
  }
  storeClick(store, url) {
    this.setState({
      storeItem: store,
    });
    this.props.changePage(url);
  }
  saleClick(sale, url) {
    console.log(sale);
    this.setState({
      saleItem: sale,
      shopItem: sale.shop,
    });
    this.props.changePage(url);
  }
  storeInsert(store) {
    loader.on();
    this.props.storeInsertRequest(store)
      .then((data) => {
        if (this.props.storeInsert.status === 'SUCCESS') {
          this.props.changePage('/store');
          this.setState({
            shopItem: null,
            customerItem: null,
          });
          this.storeLoad();
          loader.off();
        } else if (this.props.storeInsert.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  storeBulkInsert(stores) {
    loader.on();
    this.props.storeBulkInsertRequest(stores)
      .then((data) => {
        if (this.props.storeBulkInsert.status === 'SUCCESS') {
          this.props.changePage('/store');
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
  storeModify(store) {
    loader.on();
    this.props.storeModifyRequest(store)
      .then((data) => {
        if (this.props.storeModify.status === 'SUCCESS') {
          this.props.changePage('/store');
          this.storeLoad();
        } else if (this.props.storeModify.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  storeRemove(store) {
    loader.on();
    this.props.storeRemoveRequest(store)
      .then((data) => {
        if (this.props.storeRemove.status === 'SUCCESS') {
          this.props.changePage('/store');
          this.storeLoad();
        } else if (this.props.storeRemove.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  storeRemoveAll() {
    loader.on();
    this.props.storeRemoveAllRequest()
      .then((data) => {
        if (this.props.storeRemoveAll.status === 'SUCCESS') {
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
  changeStoreBulk(bulk) {

  }
  render() {
    console.log(this.state);
    return (
      <div>
        <StoreList
          onlyView={this.props.accountSession.account&&
          this.props.accountSession.account.level==='매장'}
          storeClick={this.storeClick}
          storeRemoveAllClick={() => this.props.changePage('/store/removeallmodal')}
          storeInClick={() => this.props.changePage('/store/in')}
          storeOutClick={() => this.props.changePage('/store/out')}
          list={this.props.storeGetList.list}
          refresh={this.storeLoad}
        />
        <Route
          path="/store/in"
          render={props =>
            (
              <TableModal
                title="상품 선택"
                subtitle="입고할 상품을 선택하십시요."
                close={() => this.props.changePage('/store')}
              >
                <SaleList
                  onlyView
                  saleClick={sale => this.saleClick(sale, '/store/in/insertmodal')}
                  list={this.props.saleGetList.list}
                  refresh={this.shopLoad}
                  {...props}
                />
              </TableModal>
            )
          }
        />
        <Route
          path="/store/in/insertmodal"
          render={props =>
            this.state.saleItem ?
              <StoreInsertModal
                sale={this.state.saleItem}
                close={() => this.props.changePage('/store/in')}
                storeInsert={this.storeInsert}
                shop={this.state.shopItem}
                shopSelectClick={() => this.shopSelectClick('/store/in/insertmodal/shop')}
                customer={this.state.customerItem}
                customerSelectClick={() => this.customerSelectClick('/store/in/insertmodal/customer')}
                {...props}
              /> : <Redirect to="/store" />
          }
        />
        <Route
          path="/store/in/insertmodal/shop"
          render={props =>
            (
              <TableModal
                title="매장 선택"
                subtitle="매장을 선택하십시요."
                close={() => this.props.changePage('/store/in/insertmodal')}
              >
                <ShopList
                  onlyView
                  shopClick={sale => this.shopClick(sale, '/store/in/insertmodal')}
                  list={this.props.shopGetList.list}
                  refresh={this.shopLoad}
                  {...props}
                />
              </TableModal>
            )
          }
        />
        <Route
          path="/store/in/insertmodal/customer"
          render={props =>
            (
              <TableModal
                title="고객 선택"
                subtitle="고객을 선택하십시요."
                close={() => this.props.changePage('/store/in/insertmodal')}
              >
                <CustomerList
                  onlyView
                  account={this.props.accountSession.account}
                  customerClick={sale => this.customerClick(sale, '/store/in/insertmodal')}
                  list={
                    this.state.shopItem ?
                    this.props.customerGetList.list.filter(v => v.shop._id === this.state.shopItem._id) :
                    this.props.customerGetList.list
                  }
                  refresh={this.shopLoad}
                  {...props}
                />
              </TableModal>
            )
          }
        />
        <Route
          path="/store/in/insertmodal/customer/new"
        />
        <Route
          path="/store/out"
          render={props =>
            (
              <StoreOutModal
                title="출고"
                subtitle="출고를 진행합니다."
                close={() => this.props.changePage('/store')}
                list={this.props.storeGetList.result}
                storeBulkInsert={this.storeBulkInsert}
                changeStoreBulk={this.changeStoreBulk}
                refresh={this.storeLoad}
                {...props}
              />
            )
          }
        />
        <Route
          path="/store/sale"
          render={props => (
            <TableModal
              title="상품 추가"
              subtitle="상품을 추가할 빈티지를 선택하십시요."
              close={() => this.props.changePage('/store')}
            >
              <SaleList
                onlyView
                saleClick={this.saleClick}
                list={this.props.saleGetList.list}
                refresh={this.saleLoad}
                {...props}
              />
            </TableModal>
          )}
        />
        <Route
          path="/store/sale/insertmodal"
          render={props =>
            this.state.storeInsertModalItem ?
              <StoreInsertModal
                sale={this.state.storeInsertModalItem}
                close={() => this.props.changePage('/store/sale')}
                storeInsert={this.storeInsert}
                shop={this.state.shopItem}
                shopSelectClick={() => this.shopSelectClick('/store/sale/insertmodal/shop')}
                {...props}
              /> : <Redirect to="/store" />
          }
        />
        <Route
          path="/store/sale/insertmodal/shop"
          render={props =>
            (
              <TableModal
                title="매장 선택"
                subtitle="상품을 연결할 매장을 선택하십시요."
                close={() => this.props.changePage('/store/sale/insertmodal')}
              >
                <ShopList
                  onlyView
                  shopClick={shop => this.shopClick(shop, '/store/sale/insertmodal')}
                  list={this.props.shopGetList.list}
                  refresh={this.shopLoad}
                  {...props}
                />
              </TableModal>
            )
          }
        />
        <Route
          path="/store/removeallmodal"
          render={props =>
            <RemoveModal
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="입출고내역이 전부 삭제됩니다. "
              handleRemove={this.storeRemoveAll}
              handleClose={() => this.props.changePage('/store')}
              {...props}
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
  shopGetList: {
    status: state.shop.getList.status,
    list: state.shop.getList.list,
  },
  saleGetList: {
    status: state.sale.getList.status,
    list: state.sale.getList.list,
  },
  storeGetList: {
    status: state.store.getList.status,
    list: state.store.getList.list,
    result: state.store.getList.result,
  },
  storeInsert: {
    status: state.store.insert.status,
  },
  storeBulkInsert: {
    status: state.store.bulkInsert.status,
  },
  storeRemoveAll: {
    status: state.store.removeAll.status,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  customerGetListRequest: customer.getListRequest,
  shopGetListRequest: shop.getListRequest,
  saleGetListRequest: sale.getListRequest,
  storeGetListRequest: store.getListRequest,
  storeInsertRequest: store.insertRequest,
  storeBulkInsertRequest: store.bulkInsertRequest,
  storeRemoveAllRequest: store.removeAllRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Store);
