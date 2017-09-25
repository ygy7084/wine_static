import React from 'react';
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
} from '../actions';

import {
  TableModal,
  OriginalList,
  VintageList,
  VintageModal,
  VintageInsertModal,
  RemoveModal,
} from '../components';

import {
  loader,
  errorHandler,
} from '../modules';

class Vintage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vintageModalItem: null,
      vintageInsertModalItem: null,
    };
    this.originalLoad = this.originalLoad.bind(this);
    this.vintageLoad = this.vintageLoad.bind(this);
    this.vintageClick = this.vintageClick.bind(this);
    this.originalClick = this.originalClick.bind(this);
    this.vintageInsert = this.vintageInsert.bind(this);
    this.vintageModify = this.vintageModify.bind(this);
    this.vintageRemove = this.vintageRemove.bind(this);
    this.vintageRemoveAll = this.vintageRemoveAll.bind(this);
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
  originalClick(original) {
    this.setState({
      vintageInsertModalItem: original,
    });
    this.props.changePage('/wine/vintage/original/insertmodal');
  }
  vintageInsert(vintage) {
    loader.on();
    this.props.vintageInsertRequest(vintage)
      .then((data) => {
        if (this.props.vintageInsert.status === 'SUCCESS') {
          this.props.changePage('/wine/vintage');
          this.vintageLoad();
          loader.off();
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
  vintageRemoveAll() {
    loader.on();
    this.props.vintageRemoveAllRequest()
      .then((data) => {
        if (this.props.vintageRemoveAll.status === 'SUCCESS') {
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
  render() {
    return (
      <div>
        <VintageList
          vintageClick={this.vintageClick}
          vintageRemoveAllClick={() => this.props.changePage('/wine/vintage/removeallmodal')}
          vintageInsertClick={() => this.props.changePage('/wine/vintage/original')}
          list={this.props.vintageGetList.list}
          refresh={this.vintageLoad}
        />
        <Route
          path="/wine/vintage/modal"
          render={props =>
            this.state.vintageModalItem ?
              <VintageModal
                close={() => this.props.changePage('/wine/vintage')}
                vintage={this.state.vintageModalItem}
                vintageModify={this.vintageModify}
                vintageRemove={this.vintageRemove}
                {...props}
              /> : <Redirect to="/wine/vintage" />
          }
        />
        <Route
          path="/wine/vintage/original"
          render={props => (
            <TableModal
              title="빈티지 추가"
              subtitle="빈티지를 추가할 오리지날을 선택하십시요."
              close={() => this.props.changePage('/wine/vintage')}
            >
              <OriginalList
                onlyView
                originalClick={this.originalClick}
                list={this.props.originalGetList.list}
                refresh={this.originalLoad}
                {...props}
              />
            </TableModal>
          )}
        />
        <Route
          path="/wine/vintage/original/insertmodal"
          render={props =>
            this.state.vintageInsertModalItem ?
              <VintageInsertModal
                original={this.state.vintageInsertModalItem}
                close={() => this.props.changePage('/wine/vintage/original')}
                vintageInsert={this.vintageInsert}
                {...props}
              /> : <Redirect to="/wine/vintage" />
          }
        />
        <Route
          path="/wine/vintage/removeallmodal"
          render={props =>
            <RemoveModal
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="빈티지가 전부 삭제됩니다. 이와 연관된 상품도 삭제됩니다."
              handleRemove={this.vintageRemoveAll}
              handleClose={() => this.props.changePage('/wine/vintage')}
              {...props}
            />
          }
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
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
});
const mapDispatchToProps = dispatch => bindActionCreators({
  originalGetListRequest: original.getListRequest,
  vintageGetListRequest: vintage.getListRequest,
  vintageInsertRequest: vintage.insertRequest,
  vintageModifyRequest: vintage.modifyRequest,
  vintageRemoveRequest: vintage.removeRequest,
  vintageRemoveAllRequest: vintage.removeAllRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Vintage);
