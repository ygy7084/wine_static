import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  member,
} from '../actions';

import {
  PointWrapper,
  PhoneInput,
  PointSavingModal,
  PointButtons,
  ErrorModal,
} from '../components';

import {
  loader,
} from '../modules';

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputNumber: '번호를 입력하십시요.',
      PointSavingModal_show: false,
      PointSavingModal_member: {},
      ErrorMessage: '',
      ErrorModal_show: false,
    };
    this.pointSave = this.pointSave.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.inputNumberReset = this.inputNumberReset.bind(this);
    this.errorHandle = this.errorHandle.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.pointSave.status === 'WAITING') {
      loader.on();
    } else {
      loader.off();
    }
  }
  errorHandle(data) {
    const error = data.error || data;
    if (error.message && error.message !== '') {
      const message = error.message;
      console.log(error.message);
      this.setState({
        ErrorMessage: message,
        ErrorModal_show: true,
      });
      throw error.error;
    } else {
      this.setState({
        ErrorModal_show: true,
      });
      console.log(error);
      throw error;
    }
  }
  pointSave() {
    return this.props.pointSaveRequest(this.state.inputNumber)
      .then((data) => {
        if (this.props.pointSave.status === 'SUCCESS') {
          this.setState({
            PointSavingModal_show: true,
            PointSavingModal_member: this.props.pointSave.member,
          });
          setTimeout(() => {
            this.setState({
              inputNumber: '번호를 입력하십시요.',
              PointSavingModal_show: false,
            });
          }, 3000);
        } else if (this.props.pointSave.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        this.errorHandle(data);
      });
  }
  buttonClick(number) {
    if (this.state.inputNumber === '번호를 입력하십시요.') {
      this.setState({ inputNumber: String(number) });
      return null;
    }
    if (this.state.inputNumber.length >= 11) { return null; }

    this.setState({ inputNumber: this.state.inputNumber + String(number) });
  }
  inputNumberReset() {
    this.setState({ inputNumber: '번호를 입력하십시요.' });
  }
  render() {
    return (
      <div>
        <PointWrapper>
          <PhoneInput
            inputNumber={this.state.inputNumber}
            buttonClick={this.buttonClick}
          />
          <PointButtons
            pointSave={this.pointSave}
            inputNumberReset={this.inputNumberReset}
          />
        </PointWrapper>
        <PointSavingModal
          show={this.state.PointSavingModal_show}
          inputNumber={this.state.inputNumber}
          member={this.state.PointSavingModal_member}
        />
        <ErrorModal
          message={this.state.ErrorMessage}
          close={() => { this.setState({ ErrorModal_show: false }); }}
          show={this.state.ErrorModal_show}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pointSave: {
    status: state.member.pointSave.status,
    member: state.member.pointSave.member,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  pointSaveRequest: member.pointSaveRequest,
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customer);
