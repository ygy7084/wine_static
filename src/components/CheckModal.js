import React from 'react';
import PropTypes from 'prop-types';
import { Button, Alert, ButtonGroup, FormControl, FormGroup, ControlLabel, } from 'react-bootstrap';
import Modal from 'react-bootstrap-modal';

const styles = {
  alert: {
    marginBottom: '0px',
  },
  buttons: {
    textAlign: 'right',
  },
};
class CheckModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { passwordInput: '' };
  }
  render() {
    return (
      <div>
        <Modal
          show
          onHide={this.props.handleClose}
        >
          <Alert bsStyle={this.props.bsStyle} style={styles.alert}>
            <h3>{this.props.title || 'Title'}</h3>
            <p>{this.props.subtitle || 'Subtitle'}</p>
            {
              this.props.checkPassword ?
                <FormGroup>
                  <ControlLabel>계정 비밀번호를 입력하십시요.</ControlLabel>
                  <FormControl
                    type="password"
                    value={this.state.passwordInput}
                    onChange={e => this.setState({ passwordInput: e.target.value })}
                  />
                </FormGroup> : null
            }
            <div style={styles.buttons}>
              <ButtonGroup>
                {
                  this.props.check ?
                    <Button bsSize="large" bsStyle={this.props.bsStyle}
                            onClick={() => this.props.handleCheck(this.state.passwordInput)}>{this.props.checkMessage}</Button>
                    : null
                }
                <Button bsSize="large" onClick={this.props.handleClose}>닫기</Button>
              </ButtonGroup>
            </div>
          </Alert>
        </Modal>
      </div>
    );
  }
};
CheckModal.propTyps = {
  bsStyle: PropTypes.oneOf(['success', 'warning', 'danger', 'info']).isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  check: PropTypes.bool,
  checkMessage: PropTypes.string,
  handleCheck: PropTypes.func,
  handleClose: PropTypes.func.isRequired,
  checkPassword: PropTypes.bool,
};
CheckModal.defaultProps = {
  title: '',
  subtitle: '',
  check: true,
  handleCheck: undefined,
  checkMessage: '확인',
  checkPassword: false,
};
export default CheckModal;
