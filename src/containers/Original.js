import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux';

import {
  original,
} from '../actions';

import {
  OriginalList,
  OriginalModal,
  OriginalInsertModal,
  RemoveModal,
} from '../components';

import {
  loader,
  errorHandler,
} from '../modules';

class Original extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalModalItem: null,
    };
    this.originalLoad = this.originalLoad.bind(this);
    this.originalClick = this.originalClick.bind(this);
    this.originalInsert = this.originalInsert.bind(this);
    this.originalModify = this.originalModify.bind(this);
    this.originalRemove = this.originalRemove.bind(this);
    this.originalRemoveAll = this.originalRemoveAll.bind(this);
  }
  componentWillMount() {
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
  originalClick(original) {
    this.setState({
      originalModalItem: original,
    });
    this.props.changePage('/wine/original/modal');
  }
  originalInsert(original, file) {
    this.props.originalInsertRequest(original, file)
      .then((data) => {
        if (this.props.originalInsert.status === 'SUCCESS') {
          this.props.changePage('/wine/original');
          this.originalLoad();
        } else if (this.props.originalInsert.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  originalModify(original, file) {
    this.props.originalModifyRequest(original, file)
      .then((data) => {
        if (this.props.originalModify.status === 'SUCCESS') {
          this.props.changePage('/wine/original');
          this.originalLoad();
        } else if (this.props.originalModify.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  originalRemove(original) {
    this.props.originalRemoveRequest(original)
      .then((data) => {
        if (this.props.originalRemove.status === 'SUCCESS') {
          this.props.changePage('/wine/original');
          this.originalLoad();
        } else if (this.props.originalRemove.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  originalRemoveAll() {
    loader.on();
    this.props.originalRemoveAllRequest()
      .then((data) => {
        if (this.props.originalRemoveAll.status === 'SUCCESS') {
          this.props.changePage('/wine/original');
          this.originalLoad();
        } else if (this.props.originalRemoveAll.status === 'FAILURE') {
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
        <OriginalList
          originalClick={this.originalClick}
          list={this.props.originalGetList.list}
          refresh={this.accountLoad}
          originalInsertClick={() => this.props.changePage('/wine/original/insertmodal')}
          originalRemoveAllClick={() => this.props.changePage('/wine/original/removeallmodal')}
        />
        <Route
          path="/wine/original/modal"
          render={props =>
            this.state.originalModalItem ?
              <OriginalModal
                original={this.state.originalModalItem}
                options={this.props.originalGetList.options}
                originalModify={this.originalModify}
                originalRemove={this.originalRemove}
                close={() => this.props.changePage('/wine/original')}
                {...props}
              /> : <Redirect to="/wine/original" />
          }
        />
        <Route
          path="/wine/original/insertmodal"
          render={props =>
            (<OriginalInsertModal
              originalInsert={this.originalInsert}
              options={this.props.originalGetList.options}
              close={() => this.props.changePage('/wine/original')}
              {...props}
            />)
          }
        />
        <Route
          path="/wine/original/removeallmodal"
          render={props =>
            (<RemoveModal
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="오리지날이 전부 삭제됩니다. 연관된 빈티지와 상품도 삭제됩니다."
              handleRemove={this.originalRemoveAll}
              handleClose={() => this.props.changePage('/wine/original')}
              {...props}
            />)
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
    options: state.original.getList.options,
  },
  originalInsert: {
    status: state.original.insert.status,
    original: state.original.insert.original,
  },
  originalModify: {
    status: state.original.modify.status,
  },
  originalRemove: {
    status: state.original.remove.status,
  },
  originalRemoveAll: {
    status: state.original.removeAll.status,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  originalGetListRequest: original.getListRequest,
  originalInsertRequest: original.insertRequest,
  originalModifyRequest: original.modifyRequest,
  originalRemoveRequest: original.removeRequest,
  originalRemoveAllRequest: original.removeAllRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Original);
