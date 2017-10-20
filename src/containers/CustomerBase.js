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
  CheckModal,
} from '../components';
import {
  loader,
  errorHandler,
  notify,
} from '../modules';
import structures from './structures';

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
          loader.off();
          notify('생성 완료');
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
          loader.off();
          notify('수정 완료');
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
          loader.off();
          notify('삭제 완료');
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
  customerBaseRemoveAll(password) {
    if (password !== this.props.accountSession.account.password) {
      errorHandler({ message: '잘못된 패스워드입니다.' });
    } else {
      loader.on();
      this.props.customerBaseRemoveAllRequest(
        this.props.accountSession.account.level === '매장' ?
          this.props.accountSession.account.shop : null)
        .then((data) => {
          if (this.props.customerBaseRemoveAll.status === 'SUCCESS') {
            loader.off();
            notify('삭제 완료');
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
  }
  render() {
    return (
      <div>
        <CustomerBaseList
          list={this.props.customerBaseGetList.list}
          structure={structures.customerBase}
          rowClick={this.customerBaseClick}
          insertClick={this.customerBaseInsertClick}
          refresh={this.customerBaseLoad}
          removeAllClick={() => this.props.changePage('/customerbase/removeallmodal')}
          tableToExcel={this.tableToExcel}
        />
        <Route
          path="/customerbase/modal"
          render={props =>
            this.state.customerBaseModalItem ?
              <CustomerBaseModal
                title="고객 계정 정보"
                mode="modify"
                close={() => this.props.changePage('/customerbase')}
                item={this.state.customerBaseModalItem}
                modify={this.customerBaseModify}
                remove={this.customerBaseRemove}
              /> : <Redirect to="/customerbase" />
          }
        />
        <Route
          path="/customerbase/insertmodal"
          render={props =>
            <CustomerBaseModal
              title="고객 계정 추가"
              mode="insert"
              close={() => this.props.changePage('/customerbase')}
              insert={this.customerBaseInsert}
            />
          }
        />
        <Route
          path="/customerbase/removeallmodal"
          render={props =>
            <CheckModal
              checkPassword
              bsStyle="danger"
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="고객이 전부 삭제됩니다. 연결된 고객과 입출고 내역도 사라집니다."
              handleCheck={this.customerBaseRemoveAll}
              handleClose={() => this.props.changePage('/customerbase')}
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
