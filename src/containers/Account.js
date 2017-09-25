import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import {
  account,
  shop,
} from '../actions';

import {
  TableModal,
  ShopList,
  AccountList,
  AccountModal,
  AccountInsertModal,
  RemoveModal,
} from '../components';

import {
  loader,
  errorHandler,
} from '../modules';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountModalItem: null,
      shopItem: null,
    };
    this.shopLoad = this.shopLoad.bind(this);
    this.accountLoad = this.accountLoad.bind(this);
    this.accountClick = this.accountClick.bind(this);
    this.accountInsertClick = this.accountInsertClick.bind(this);
    this.accountInsert = this.accountInsert.bind(this);
    this.accountModify = this.accountModify.bind(this);
    this.accountRemove = this.accountRemove.bind(this);
    this.accountRemoveAll = this.accountRemoveAll.bind(this);
    this.shopClick = this.shopClick.bind(this);
    this.shopUnClick = this.shopUnClick.bind(this);
    this.shopSelectClick = this.shopSelectClick.bind(this);
  }
  componentWillMount() {
    this.accountLoad();
  }
  shopLoad() {
    loader.on();
    this.props.shopGetListRequest()
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
  accountLoad() {
    loader.on();
    this.props.accountGetListRequest()
      .then((data) => {
        if (this.props.accountGetList.status === 'SUCCESS') {
          loader.off();
        } else if (this.props.accountGetList.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  accountClick(account) {
    this.setState({
      accountModalItem: account,
    });
    this.props.changePage('/account/modal');
  }
  accountInsertClick() {
    this.props.changePage('/account/insertmodal');
  }
  accountInsert(account) {
    loader.on();
    this.props.accountInsertRequest(account)
      .then((data) => {
        if (this.props.accountInsert.status === 'SUCCESS') {
          this.props.changePage('/account');
          this.shopUnClick();
          this.accountLoad();
        } else if (this.props.accountInsert.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  accountModify(account) {
    loader.on();
    this.props.accountModifyRequest(account)
      .then((data) => {
        if (this.props.accountModify.status === 'SUCCESS') {
          this.props.changePage('/account');
          this.shopUnClick();
          this.accountLoad();
        } else if (this.props.accountModify.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  accountRemove(account) {
    loader.on();
    this.props.accountRemoveRequest(account)
      .then((data) => {
        if (this.props.accountRemove.status === 'SUCCESS') {
          this.props.changePage('/account');
          this.shopUnClick();
          this.accountLoad();
        } else if (this.props.accountRemove.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  accountRemoveAll() {
    loader.on();
    this.props.accountRemoveAllRequest()
      .then((data) => {
        if (this.props.accountRemoveAll.status === 'SUCCESS') {
          this.props.changePage('/account');
          this.shopUnClick();
          this.accountLoad();
        } else if (this.props.accountRemoveAll.status === 'FAILURE') {
          loader.off();
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
  shopSelectClick(url) {
    this.shopLoad();
    this.setState({ shopItem: null });
    this.props.changePage(url);
  }
  shopUnClick() {
    this.setState({ shopItem: null });
  }
  render() {
    return (
      <div>
        <AccountList
          accountClick={this.accountClick}
          accountInsertClick={this.accountInsertClick}
          list={this.props.accountGetList.list}
          refresh={this.accountLoad}
          accountRemoveAllClick={() => this.props.changePage('/account/removeallmodal')}
        />
        <Route
          path="/account/modal"
          render={props =>
            this.state.accountModalItem ?
              <AccountModal
                close={() => this.props.changePage('/account')}
                account={this.state.accountModalItem}
                accountModify={this.accountModify}
                accountRemove={this.accountRemove}
                shop={this.state.shopItem}
                shopUnClick={this.shopUnClick}
                shopSelectClick={() => this.shopSelectClick('/account/modal/shop')}
                {...props}
              /> : <Redirect to="/account" />
          }
        />
        <Route
          path="/account/modal/shop"
          render={props =>
            (
              <TableModal
                title="매장 선택"
                subtitle="계정을 연결할 매장을 선택하십시요."
                close={() => this.props.changePage('/account/modal')}
              >
                <ShopList
                  onlyView
                  shopClick={shop => this.shopClick(shop, '/account/modal')}
                  list={this.props.shopGetList.list}
                  refresh={this.shopLoad}
                  {...props}
                />
              </TableModal>
            )
          }
        />
        <Route
          path="/account/insertmodal"
          render={props =>
            (<AccountInsertModal
              close={() => this.props.changePage('/account')}
              accountInsert={this.accountInsert}
              shop={this.state.shopItem}
              shopUnClick={this.shopUnClick}
              shopSelectClick={() => this.shopSelectClick('/account/insertmodal/shop')}
              {...props}
            />)
          }
        />
        <Route
          path="/account/insertmodal/shop"
          render={props =>
            (
              <TableModal
                title="매장 선택"
                subtitle="계정을 연결할 매장을 선택하십시요."
                close={() => this.props.changePage('/account/insertmodal')}
              >
                <ShopList
                  onlyView
                  shopClick={shop => this.shopClick(shop, '/account/insertmodal')}
                  list={this.props.shopGetList.list}
                  refresh={this.shopLoad}
                  {...props}
                />
              </TableModal>
            )
          }
        />
        <Route
          path="/account/removeallmodal"
          render={props =>
            (<RemoveModal
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="계정이 전부 삭제됩니다. 초기화 계정(ID: 0, PASSWORD: 0)이 다시 생성됩니다."
              handleRemove={this.accountRemoveAll}
              handleClose={() => this.props.changePage('/account')}
              {...props}
            />)
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shopGetList: {
    status: state.shop.getList.status,
    list: state.shop.getList.list,
  },
  accountGetList: {
    status: state.account.getList.status,
    list: state.account.getList.list,
  },
  accountInsert: {
    status: state.account.insert.status,
    account: state.account.insert.account,
  },
  accountModify: {
    status: state.account.modify.status,
  },
  accountRemove: {
    status: state.account.remove.status,
  },
  accountRemoveAll: {
    status: state.account.removeAll.status,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  shopGetListRequest: shop.getListRequest,
  accountSessionRequest: account.sessionRequest,
  accountGetListRequest: account.getListRequest,
  accountInsertRequest: account.insertRequest,
  accountModifyRequest: account.modifyRequest,
  accountRemoveRequest: account.removeRequest,
  accountRemoveAllRequest: account.removeAllRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);
