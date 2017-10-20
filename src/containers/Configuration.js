import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import {
  configuration,
  customerBase,
} from '../actions';
import {
  EmailConfiguration,
} from '../components';
import {
  loader,
  errorHandler,
  notify,
} from '../modules';

class Configuration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.configurationLoad = this.configurationLoad.bind(this);
    this.configurationModify = this.configurationModify.bind(this);
    this.findPasswordTest = this.findPasswordTest.bind(this);
  }
  componentWillMount() {
    this.configurationLoad();
  }
  configurationLoad() {
    loader.on();
    this.props.configurationGetRequest()
      .then((data) => {
        if (this.props.configurationGet.status === 'SUCCESS') {
          loader.off();
        } else if (this.props.configurationGet.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  configurationModify(configuration, mode) {
    loader.on();
    const input = {
      _id: this.props.configurationGet.configuration._id,
    };
    input[mode] = configuration;
    this.props.configurationModifyRequest(input)
      .then((data) => {
        if (this.props.configurationModify.status === 'SUCCESS') {
          loader.off();
          notify('수정 완료');
          this.props.changePage('/configuration');
          this.configurationLoad();
        } else if (this.props.configurationModify.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  findPasswordTest(to) {
    loader.on();
    this.props.customerBaseFindPasswordRequest({
      to,
      phone: 'thisistestphonenumber'
    })
      .then((data) => {
        if (this.props.customerBaseFindPassword.status === 'SUCCESS') {
          loader.off();
          notify('전송 완료');
          this.props.changePage('/configuration');
        } else if (this.props.customerBaseFindPassword.status === 'FAILURE') {
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
        {
          this.props.configurationGet.configuration ?
            <EmailConfiguration
              configuration={this.props.configurationGet.configuration.email}
              modify={(obj) => this.configurationModify(obj, 'email')}
              test={this.findPasswordTest}
            /> : null
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  configurationGet: {
    status: state.configuration.get.status,
    configuration: state.configuration.get.configuration,
  },
  configurationModify: {
    status: state.configuration.modify.status,
  },
  customerBaseFindPassword: {
    status: state.customerBase.findPassword.status,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  configurationGetRequest: configuration.getRequest,
  configurationModifyRequest: configuration.modifyRequest,
  customerBaseFindPasswordRequest: customerBase.findPasswordRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Configuration);
