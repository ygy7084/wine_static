import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import {
  customerBase,
} from '../actions';

import {
  CustomerBaseList,
  CustomerBaseModal,
  CustomerBaseInsertModal,
  RemoveModal,
} from '../components';

import {
  loader,
  errorHandler,
} from '../modules';

class CustomerBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerBaseModalItem: null,
    };
    this.customerBaseLoad = this.customerBaseLoad.bind(this);
    this.customerBaseClick = this.customerBaseClick.bind(this);
    this.customerBaseInsertClick = this.customerBaseInsertClick.bind(this);
    this.customerBaseInsert = this.customerBaseInsert.bind(this);
    this.customerBaseModify = this.customerBaseModify.bind(this);
    this.customerBaseRemove = this.customerBaseRemove.bind(this);
    this.customerBaseRemoveAll = this.customerBaseRemoveAll.bind(this);
  }
  componentWillMount() {
    this.customerBaseLoad();
  }
  customerBaseLoad() {
    loader.on();
    this.props.customerBaseGetListRequest()
      .then((data) => {
        if (this.props.customerBaseGetList.status === 'SUCCESS') {
          loader.off();
        } else if (this.props.customerBaseGetList.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  customerBaseClick(customerBase) {
    this.setState({
      customerBaseModalItem: customerBase,
    });
    this.props.changePage('/customerbase/modal');
  }
  customerBaseInsertClick() {
    this.props.changePage('/customerbase/insertmodal');
  }
  customerBaseInsert(customerBase) {
    loader.on();
    this.props.customerBaseInsertRequest(customerBase)
      .then((data) => {
        if (this.props.customerBaseInsert.status === 'SUCCESS') {
          this.props.changePage('/customerbase');
          this.customerBaseLoad();
        } else if (this.props.customerBaseInsert.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  customerBaseModify(customerBase) {
    loader.on();
    this.props.customerBaseModifyRequest(customerBase)
      .then((data) => {
        if (this.props.customerBaseModify.status === 'SUCCESS') {
          this.props.changePage('/customerbase');
          this.customerBaseLoad();
        } else if (this.props.customerBaseModify.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  customerBaseRemove(customerBase) {
    loader.on();
    this.props.customerBaseRemoveRequest(customerBase)
      .then((data) => {
        if (this.props.customerBaseRemove.status === 'SUCCESS') {
          this.props.changePage('/customerbase');
          this.customerBaseLoad();
        } else if (this.props.customerBaseRemove.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  customerBaseRemoveAll() {
    loader.on();
    this.props.customerBaseRemoveAllRequest(
      this.props.accountSession.account.level === '매장' ?
        this.props.accountSession.account.shop : null)
      .then((data) => {
        if (this.props.customerBaseRemoveAll.status === 'SUCCESS') {
          this.props.changePage('/customerbase');
          this.customerBaseLoad();
        } else if (this.props.customerBaseRemoveAll.status === 'FAILURE') {
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
        <CustomerBaseList
          account={this.props.accountSession.account}
          customerBaseClick={this.customerBaseClick}
          customerBaseInsertClick={this.customerBaseInsertClick}
          list={this.props.customerBaseGetList.list}
          refresh={this.customerBaseLoad}
          customerBaseRemoveAllClick={() => this.props.changePage('/customerbase/removeallmodal')}
        />
        <Route
          path="/customerbase/modal"
          render={props =>
            this.state.customerBaseModalItem ?
              <CustomerBaseModal
                close={() => this.props.changePage('/customerbase')}
                customerBase={this.state.customerBaseModalItem}
                customerBaseModify={this.customerBaseModify}
                customerBaseRemove={this.customerBaseRemove}
                account={this.props.accountSession.account}
                {...props}
              /> : <Redirect to="/customerbase" />
          }
        />
        <Route
          path="/customerbase/insertmodal"
          render={props =>
            (<CustomerBaseInsertModal
              close={() => this.props.changePage('/customerbase')}
              customerBaseInsert={this.customerBaseInsert}
              account={this.props.accountSession.account}
              {...props}
            />)
          }
        />
        <Route
          path="/customerbase/removeallmodal"
          render={props =>
            (<RemoveModal
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="고객이 전부 삭제됩니다. 연결된 고객과 입출고 내역도 사라집니다."
              handleRemove={this.customerBaseRemoveAll}
              handleClose={() => this.props.changePage('/customerbase')}
              {...props}
            />)
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
  customerBaseGetList: {
    status: state.customerBase.getList.status,
    list: state.customerBase.getList.list,
  },
  customerBaseInsert: {
    status: state.customerBase.insert.status,
    customerBase: state.customerBase.insert.customerBase,
  },
  customerBaseModify: {
    status: state.customerBase.modify.status,
  },
  customerBaseRemove: {
    status: state.customerBase.remove.status,
  },
  customerBaseRemoveAll: {
    status: state.customerBase.removeAll.status,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  customerBaseGetListRequest: customerBase.getListRequest,
  customerBaseInsertRequest: customerBase.insertRequest,
  customerBaseModifyRequest: customerBase.modifyRequest,
  customerBaseRemoveRequest: customerBase.removeRequest,
  customerBaseRemoveAllRequest: customerBase.removeAllRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerBase);
