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
  AccountListForSelect,
} from '../components';

import {
  loader,
  errorHandler,
} from '../modules';

const structure = [
  {
    name: 'ID',
    key: ['username'],
  },
  {
    name: '이름',
    key: ['name'],
  },
  {
    name: '권한',
    key: ['level'],
  },
  {
    name: '매장명',
    key: ['shop', 'name'],
  },
];
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
    };
    this.accountClick = this.accountClick.bind(this);
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
  accountClick(item) {
    const found = this.state.selectedItems.findIndex(obj => obj._id === item._id);
    const newList = JSON.parse(JSON.stringify(this.state.selectedItems));
    if (found > -1) {
      newList.splice(found, 1);
    } else {
      newList.push(item);
    }
    this.setState({ selectedItems: newList });
  }
  accountInsertClick() {
    this.props.changePage('/account/insertmodal');
  }
  accountInsert(account) {
    loader.on();
    this.props.accountInsertRequest(account)
      .then((data) => {
        if (this.props.accountInsert.status === 'SUCCESS') {
          loader.off();
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
          loader.off();
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
          loader.off();
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
          loader.off();
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
    const list = JSON.parse(JSON.stringify(this.props.accountGetList.list));
    for(let i=0;i<25;i++) {
      list.push({
        _id:i,
        username: `user ${i}`,
        name: `name ${i}`,
      });
    }
    return (
      <div>
        <AccountListForSelect
          list={list}
          structure={structure}
          selectedItems={this.state.selectedItems}
          rowSelect={this.accountClick}
          outputExcel={e => console.log(e)}
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
