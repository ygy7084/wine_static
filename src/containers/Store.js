import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
} from '../actions';

import {
} from '../components';

import {
  loader,
} from '../modules';

class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        Store
      </div>
    );
  }
}

const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Store);
