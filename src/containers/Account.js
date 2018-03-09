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
  account,
  shop,
  excel,
} from '../actions';
import {
  AccountList,
  AccountModal,
  CheckModal,
} from '../components';
import {
  loader,
  errorHandler,
  notify,
} from '../modules';
import structures from './structures';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountModalItem: null,
    };
    this.shopLoad = this.shopLoad.bind(this);
    this.accountLoad = this.accountLoad.bind(this);
    this.accountClick = this.accountClick.bind(this);
    this.accountInsertClick = this.accountInsertClick.bind(this);
    this.accountInsert = this.accountInsert.bind(this);
    this.accountModify = this.accountModify.bind(this);
    this.accountRemove = this.accountRemove.bind(this);
    this.accountRemoveAll = this.accountRemoveAll.bind(this);
    this.accountRemoveAllClick = this.accountRemoveAllClick.bind(this);
    this.tableToExcel = this.tableToExcel.bind(this);
  }
  componentWillMount() {
    this.shopLoad();
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
    this.props.changePage(`${this.props.match.url}/modal`);
  }
  accountInsertClick() {
    this.props.changePage(`${this.props.match.url}/insertmodal`);
  }
  accountRemoveAllClick() {
    this.props.changePage(`${this.props.match.url}/removeallmodal`);
  }
  accountInsert(account) {
    loader.on();
    this.props.accountInsertRequest(account)
      .then((data) => {
        if (this.props.accountInsert.status === 'SUCCESS') {
          loader.off();
          notify('생성 완료');
          this.props.changePage(`${this.props.match.url}`);
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
          notify('수정 완료');
          this.props.changePage(`${this.props.match.url}`);
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
          notify('삭제 완료');
          this.props.changePage(`${this.props.match.url}`);
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
  accountRemoveAll(password) {
    if (password !== this.props.accountSession.account.password) {
      errorHandler({ message: '잘못된 패스워드입니다.' });
    } else {
      loader.on();
      this.props.accountRemoveAllRequest()
        .then((data) => {
          if (this.props.accountRemoveAll.status === 'SUCCESS') {
            loader.off();
            notify('삭제 완료');
            this.props.changePage(`${this.props.match.url}`);
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
    const { match } = this.props;
    return (
      <div>
        <AccountList
          list={this.props.accountGetList.list}
          structure={structures.account}
          rowClick={this.accountClick}
          insertClick={this.accountInsertClick}
          refresh={this.accountLoad}
          removeAllClick={this.accountRemoveAllClick}
          tableToExcel={this.tableToExcel}
        />
        <Route
          path={`${match.url}/modal`}
          render={props =>
            this.state.accountModalItem ?
              <AccountModal
                title="계정 정보"
                mode="modify"
                close={() => this.props.changePage(match.url)}
                item={this.state.accountModalItem}
                modify={this.accountModify}
                remove={this.accountRemove}
                shopList={this.props.shopGetList.list}
                shopStructure={structures.shop}
              /> : <Redirect to={match.url} />
          }
        />
        <Route
          path={`${match.url}/insertmodal`}
          render={props =>
            (<AccountModal
              title="계정 추가"
              mode="insert"
              close={() => this.props.changePage(match.url)}
              insert={this.accountInsert}
              shopList={this.props.shopGetList.list}
              shopStructure={structures.shop}
            />)
          }
        />
        <Route
          path={`${match.url}/removeallmodal`}
          render={props => (
            <CheckModal
              checkPassword
              bsStyle="danger"
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="계정이 전부 삭제됩니다. 초기화 계정(ID: 0, PASSWORD: 0)이 다시 생성됩니다."
              handleCheck={this.accountRemoveAll}
              handleClose={() => this.props.changePage(match.url)}
            />
          )
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
  excelTableToExcel: {
    status: state.excel.tableToExcel.status,
    file: state.excel.tableToExcel.file,
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
  excelTableToExcelReqeust: excel.tableToExcelRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);
