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
  original,
  vintage,
  excel,
} from '../actions';
import {
  VintageList,
  VintageModal,
  VintageInsertModal,
  CheckModal,
} from '../components';
import {
  loader,
  errorHandler,
  notify,
} from '../modules';
import structures from './structures';

class Vintage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vintageModalItem: null,
    };
    this.originalLoad = this.originalLoad.bind(this);
    this.vintageLoad = this.vintageLoad.bind(this);
    this.vintageClick = this.vintageClick.bind(this);
    this.vintageInsert = this.vintageInsert.bind(this);
    this.vintageModify = this.vintageModify.bind(this);
    this.vintageRemove = this.vintageRemove.bind(this);
    this.vintageRemoveAll = this.vintageRemoveAll.bind(this);
    this.tableToExcel = this.tableToExcel.bind(this);
  }
  componentWillMount() {
    this.vintageLoad();
    this.originalLoad();
  }
  originalLoad() {
    loader.on();
    this.props.originalGetListRequest()
      .then((data) => {
        if (this.props.originalGetList.status === 'SUCCESS') {
          loader.off();
        } else if (this.props.originalGetList.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  vintageLoad() {
    loader.on();
    this.props.vintageGetListRequest()
      .then((data) => {
        if (this.props.vintageGetList.status === 'SUCCESS') {
          loader.off();
        } else if (this.props.vintageGetList.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  vintageClick(vintage) {
    this.setState({
      vintageModalItem: vintage,
    });
    this.props.changePage('/wine/vintage/modal');
  }
  vintageInsert(vintage) {
    loader.on();
    this.props.vintageInsertRequest(vintage)
      .then((data) => {
        if (this.props.vintageInsert.status === 'SUCCESS') {
          loader.off();
          notify('생성 완료');
          this.props.changePage('/wine/vintage');
          this.vintageLoad();
        } else if (this.props.vintageInsert.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  vintageModify(vintage) {
    loader.on();
    this.props.vintageModifyRequest(vintage)
      .then((data) => {
        if (this.props.vintageModify.status === 'SUCCESS') {
          loader.off();
          notify('수정 완료');
          this.props.changePage('/wine/vintage');
          this.vintageLoad();
        } else if (this.props.vintageModify.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  vintageRemove(vintage) {
    loader.on();
    this.props.vintageRemoveRequest(vintage)
      .then((data) => {
        if (this.props.vintageRemove.status === 'SUCCESS') {
          loader.off();
          notify('삭제 완료');
          this.props.changePage('/wine/vintage');
          this.vintageLoad();
        } else if (this.props.vintageRemove.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  vintageRemoveAll(password) {
    if (password !== this.props.accountSession.account.password) {
      errorHandler({ message: '잘못된 패스워드입니다.' });
    } else {
      loader.on();
      this.props.vintageRemoveAllRequest()
        .then((data) => {
          if (this.props.vintageRemoveAll.status === 'SUCCESS') {
            loader.off();
            notify('삭제 완료');
            this.props.changePage('/wine/vintage');
            this.vintageLoad();
          } else if (this.props.vintageRemoveAll.status === 'FAILURE') {
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
        <VintageList
          list={this.props.vintageGetList.list}
          structure={structures.vintage}
          rowClick={this.vintageClick}
          refresh={this.vintageLoad}
          removeAllClick={() => this.props.changePage('/wine/vintage/removeallmodal')}
          insertClick={() => this.props.changePage('/wine/vintage/insert')}
          tableToExcel={this.tableToExcel}
        />
        <Route
          path="/wine/vintage/modal"
          render={props =>
            this.state.vintageModalItem ?
              <VintageModal
                imageView
                title="빈티지 정보"
                mode="modify"
                item={this.state.vintageModalItem}
                modify={this.vintageModify}
                remove={this.vintageRemove}
                close={() => this.props.changePage('/wine/vintage')}
              /> : <Redirect to="/wine/vintage" />
          }
        />
        <Route
          path="/wine/vintage/insert"
          render={props => (
            <VintageInsertModal
              title="빈티지 추가"
              subtitle="빈티지를 추가할 오리지날을 선택하십시요."
              originalStructure={structures.original}
              originalList={this.props.originalGetList.list}
              insert={this.vintageInsert}
              close={() => this.props.changePage('/wine/vintage')}
            />
          )}
        />
        <Route
          path="/wine/vintage/removeallmodal"
          render={props => (
            <CheckModal
              checkPassword
              bsStyle="danger"
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="빈티지가 전부 삭제됩니다. 이와 연관된 상품도 삭제됩니다."
              handleCheck={this.vintageRemoveAll}
              handleClose={() => this.props.changePage('/wine/vintage')}
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
  originalGetList: {
    status: state.original.getList.status,
    list: state.original.getList.list,
  },
  vintageGetList: {
    status: state.vintage.getList.status,
    list: state.vintage.getList.list,
  },
  vintageInsert: {
    status: state.vintage.insert.status,
    vintage: state.vintage.insert.vintage,
  },
  vintageModify: {
    status: state.vintage.modify.status,
  },
  vintageRemove: {
    status: state.vintage.remove.status,
  },
  vintageRemoveAll: {
    status: state.vintage.removeAll.status,
  },
  excelTableToExcel: {
    status: state.excel.tableToExcel.status,
    file: state.excel.tableToExcel.file,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  originalGetListRequest: original.getListRequest,
  vintageGetListRequest: vintage.getListRequest,
  vintageInsertRequest: vintage.insertRequest,
  vintageModifyRequest: vintage.modifyRequest,
  vintageRemoveRequest: vintage.removeRequest,
  vintageRemoveAllRequest: vintage.removeAllRequest,
  excelTableToExcelReqeust: excel.tableToExcelRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Vintage);
