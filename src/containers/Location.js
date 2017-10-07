import React from 'react';
import {
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import {
  location,
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
    name: '국가',
    key: ['country'],
    stateKey: 'country',
    style: {
      width: '30%',
    },
  },
  {
    name: '지역',
    key: ['region'],
    stateKey: 'region',
    style: {
      width: '30%',
    },
  },
  {
    name: '세부지역',
    key: ['subregion'],
    stateKey: 'subregion',
    style: {
      width: '30%',
    },
  },
];
class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: null,
    };
    this.locationLoad = this.locationLoad.bind(this);
    this.locationClick = this.locationClick.bind(this);
    this.locationInsert = this.locationInsert.bind(this);
    this.locationRemove = this.locationRemove.bind(this);
    this.locationRemoveAll = this.locationRemoveAll.bind(this);
  }
  componentWillMount() {
    this.locationLoad();
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
  locationClick(location) {
    this.setState({ selectedLocation: location });
    this.props.changePage('/wine/location/removemodal');
  }
  locationInsert(location) {
    loader.on();
    this.props.locationInsertRequest(location)
      .then((data) => {
        if (this.props.locationInsert.status === 'SUCCESS') {
          loader.off();
          this.props.changePage('/wine/location');
          this.locationLoad();
        } else if (this.props.locationInsert.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  locationRemove() {
    loader.on();
    this.props.locationRemoveRequest(this.state.selectedLocation)
      .then((data) => {
        if (this.props.locationRemove.status === 'SUCCESS') {
          loader.off();
          this.props.changePage('/wine/location');
          this.locationLoad();
        } else if (this.props.locationRemove.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  locationRemoveAll() {
    loader.on();
    this.props.locationRemoveAllRequest()
      .then((data) => {
        if (this.props.locationRemoveAll.status === 'SUCCESS') {
          loader.off();
          this.props.changePage('/wine/location');
          this.locationLoad();
        } else if (this.props.locationRemoveAll.status === 'FAILURE') {
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
          rowClick={this.locationClick}
          structure={structure}
          list={this.props.locationGetList.list}
          insert={this.locationInsert}
          refresh={this.locationLoad}
          removeAllClick={() => this.props.changePage('/wine/location/removeallmodal')}
        />

        <Route
          path="/wine/location/removemodal"
          render={props => (
            <CheckModal
              bsStyle="danger"
              title="주의! 선택한 리스트를 삭제합니다."
              subtitle="원산지 정보를 삭제합니다."
              handleCheck={this.locationRemove}
              handleClose={() => this.props.changePage('/wine/location')}
            />
          )
          }
        />
        <Route
          path="/wine/location/removeallmodal"
          render={props => (
            <CheckModal
              bsStyle="danger"
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="원산지 정보를 삭제합니다."
              handleCheck={this.locationRemoveAll}
              handleClose={() => this.props.changePage('/wine/location')}
            />
          )
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locationGetList: {
    status: state.location.getList.status,
    list: state.location.getList.list,
  },
  locationInsert: {
    status: state.location.insert.status,
    location: state.location.insert.location,
  },
  locationRemove: {
    status: state.location.remove.status,
  },
  locationRemoveAll: {
    status: state.location.removeAll.status,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  locationGetListRequest: location.getListRequest,
  locationInsertRequest: location.insertRequest,
  locationRemoveRequest: location.removeRequest,
  locationRemoveAllRequest: location.removeAllRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Location);
