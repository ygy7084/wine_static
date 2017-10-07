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
  grape,
  location,
} from '../actions';

import {
  OriginalList,
  OriginalModal,
  CheckModal,
} from '../components';

import {
  loader,
  errorHandler,
} from '../modules';

import structures from './structures';

class Original extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalModalItem: null,
    };
    this.originalLoad = this.originalLoad.bind(this);
    this.grapeLoad = this.grapeLoad.bind(this);
    this.locationLoad = this.locationLoad.bind(this);
    this.originalClick = this.originalClick.bind(this);
    this.originalInsert = this.originalInsert.bind(this);
    this.originalModify = this.originalModify.bind(this);
    this.originalRemove = this.originalRemove.bind(this);
    this.originalRemoveAll = this.originalRemoveAll.bind(this);
  }
  componentWillMount() {
    this.originalLoad();
    this.grapeLoad();
    this.locationLoad();
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
  grapeLoad() {
    loader.on();
    this.props.grapeGetListRequest()
      .then((data) => {
        if (this.props.grapeGetList.status === 'SUCCESS') {
          loader.off();
        } else if (this.props.grapeGetList.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  locationLoad() {
    loader.on();
    this.props.locationGetListRequest()
      .then((data) => {
        if (this.props.locationGetList.status === 'SUCCESS') {
          loader.off();
        } else if (this.props.locationGetList.status === 'FAILURE') {
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
    loader.on();
    this.props.originalInsertRequest(original, file)
      .then((data) => {
        if (this.props.originalInsert.status === 'SUCCESS') {
          loader.off();
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
    loader.on();
    this.props.originalModifyRequest(original, file)
      .then((data) => {
        if (this.props.originalModify.status === 'SUCCESS') {
          loader.off();
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
    loader.on();
    this.props.originalRemoveRequest(original)
      .then((data) => {
        if (this.props.originalRemove.status === 'SUCCESS') {
          loader.off();
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
          loader.off();
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
          list={this.props.originalGetList.list}
          structure={structures.original}
          rowClick={this.originalClick}
          refresh={this.originalLoad}
          insertClick={() => this.props.changePage('/wine/original/insertmodal')}
          removeAllClick={() => this.props.changePage('/wine/original/removeallmodal')}
          outputTable={e => console.log(e)}
        />
        <Route
          path="/wine/original/modal"
          render={props =>
            this.state.originalModalItem ?
              <OriginalModal
                title="오리지날 정보"
                mode="modify"
                item={this.state.originalModalItem}
                locations={this.props.locationGetList.options}
                grapes={this.props.grapeGetList.list}
                modify={this.originalModify}
                remove={this.originalRemove}
                close={() => this.props.changePage('/wine/original')}
                {...props}
              /> : <Redirect to="/wine/original" />
          }
        />
        <Route
          path="/wine/original/insertmodal"
          render={props =>
            this.props.locationGetList.options ?
              <OriginalModal
                title="오리지날 추가"
                mode="insert"
                locations={this.props.locationGetList.options}
                grapes={this.props.grapeGetList.list}
                insert={this.originalInsert}
                close={() => this.props.changePage('/wine/original')}
                {...props}
              /> : <Redirect to="/wine/original" />
          }
        />
        <Route
          path="/wine/original/removeallmodal"
          render={props =>
            <CheckModal
              bsStyle="danger"
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="오리지날이 전부 삭제됩니다. 연관된 빈티지와 상품도 삭제됩니다."
              handleCheck={this.originalRemoveAll}
              handleClose={() => this.props.changePage('/wine/original')}
            />
          }
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  grapeGetList: {
    status: state.grape.getList.status,
    list: state.grape.getList.list,
  },
  locationGetList: {
    status: state.location.getList.status,
    list: state.location.getList.list,
    options: state.location.getList.options,
  },
  originalGetList: {
    status: state.original.getList.status,
    list: state.original.getList.list,
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
  grapeGetListRequest: grape.getListRequest,
  locationGetListRequest: location.getListRequest,
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
