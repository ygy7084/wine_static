import React from 'react';
import {
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import {
  grape,
} from '../actions';

import {
  ListA,
  CheckModal,
} from '../components';

import {
  loader,
  errorHandler,
} from '../modules';

const structure = [
  {
    name: '품종', // used for findMode
    key: ['name'], // used for find value
    stateKey: 'name', // used for making state and API input
    style: {
      width: '50%',
    },
  },
];
class Grape extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGrape: null,
    };
    this.grapeLoad = this.grapeLoad.bind(this);
    this.grapeClick = this.grapeClick.bind(this);
    this.grapeInsert = this.grapeInsert.bind(this);
    this.grapeRemove = this.grapeRemove.bind(this);
    this.grapeRemoveAll = this.grapeRemoveAll.bind(this);
  }
  componentWillMount() {
    this.grapeLoad();
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
  grapeClick(grape) {
    this.setState({ selectedGrape: grape });
    this.props.changePage('/wine/grape/removemodal');
  }
  grapeInsert(grape) {
    loader.on();
    this.props.grapeInsertRequest(grape)
      .then((data) => {
        if (this.props.grapeInsert.status === 'SUCCESS') {
          loader.off();
          this.props.changePage('/wine/grape');
          this.grapeLoad();
        } else if (this.props.grapeInsert.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  grapeRemove() {
    loader.on();
    this.props.grapeRemoveRequest(this.state.selectedGrape)
      .then((data) => {
        if (this.props.grapeRemove.status === 'SUCCESS') {
          loader.off();
          this.props.changePage('/wine/grape');
          this.grapeLoad();
        } else if (this.props.grapeRemove.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  grapeRemoveAll() {
    loader.on();
    this.props.grapeRemoveAllRequest()
      .then((data) => {
        if (this.props.grapeRemoveAll.status === 'SUCCESS') {
          loader.off();
          this.props.changePage('/wine/grape');
          this.grapeLoad();
        } else if (this.props.grapeRemoveAll.status === 'FAILURE') {
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
        <ListA
          rowClick={this.grapeClick}
          structure={structure}
          list={this.props.grapeGetList.list}
          insert={this.grapeInsert}
          refresh={this.grapeLoad}
          removeAllClick={() => this.props.changePage('/wine/grape/removeallmodal')}
        />

        <Route
          path="/wine/grape/removemodal"
          render={props => (
            <CheckModal
              bsStyle="danger"
              title="주의! 선택한 리스트를 삭제합니다."
              subtitle="품종 정보를 삭제합니다."
              handleCheck={this.grapeRemove}
              handleClose={() => this.props.changePage('/wine/grape')}
            />
          )
          }
        />
        <Route
          path="/wine/grape/removeallmodal"
          render={props => (
            <CheckModal
              bsStyle="danger"
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="품종 정보를 삭제합니다."
              handleCheck={this.grapeRemoveAll}
              handleClose={() => this.props.changePage('/wine/grape')}
            />
          )
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
  grapeInsert: {
    status: state.grape.insert.status,
    grape: state.grape.insert.grape,
  },
  grapeRemove: {
    status: state.grape.remove.status,
  },
  grapeRemoveAll: {
    status: state.grape.removeAll.status,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  grapeGetListRequest: grape.getListRequest,
  grapeInsertRequest: grape.insertRequest,
  grapeRemoveRequest: grape.removeRequest,
  grapeRemoveAllRequest: grape.removeAllRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Grape);
