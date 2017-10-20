import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ControlLabel,
  Form,
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import Modal from 'react-bootstrap-modal';
import {
  errorHandler,
} from '../modules';

const styles = {
  header: {
    textAlign: 'center',
  },
  buttons: {
    display: 'inline-block',
    marginRight: '10px',
  },
};
class CustomerSideBaseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: this.props.item.password,
      passwordCheck: '',
      passwordShow: false,
      email: this.props.item.email,
    };
    this.handleModify = this.handleModify.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps) && nextProps && nextProps.item) {
      this.setState({
        password: nextProps.item.password,
        email: nextProps.item.email,
      });
    }
  }
  handleModify() {
    if (this.state.password === this.state.passwordCheck
      && this.state.password !== ''
      && this.state.password.length === 4
      && this.state.password.replace(/\D/g, '').length === 4
    ) {
      this.props.modify({
        _id: this.props.item._id,
        email: this.state.email,
        password: this.state.password,
      });
    } else {
      errorHandler({
        message: '비밀번호와 비밀번호 확인 값을 올바르게 입력해주십시요.',
      });
    }
  }
  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.close}
        >
          <Form onSubmit={(e) => e.preventDefault()}>
            <Modal.Header style={styles.header}>
              <h1>{this.props.title}</h1>
              <p>변경사항 적용을 위해 변경 후, 로그아웃됩니다.</p>
            </Modal.Header>
            <Modal.Body>
              <FormGroup controlId="formControlsText">
                <ControlLabel>이메일</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>비밀번호(반드시 숫자 4자리)</ControlLabel>
                <FormControl
                  type={!this.state.passwordShow ? "password" : "text"}
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </FormGroup>
              <FormGroup
                controlId="formControlsText"
                validationState={
                  (this.state.modifyMode || this.props.mode === 'insert')
                  && this.state.password !== this.state.passwordCheck ?
                    'error' : null}
              >
                <ControlLabel>비밀번호 확인</ControlLabel>
                <FormControl
                  type={!this.state.passwordShow ? "password" : "text"}
                  value={this.state.passwordCheck}
                  onChange={e => this.setState({ passwordCheck: e.target.value })}
                />
              </FormGroup>
              <Button
                key="show"
                onClick={() => this.setState({ passwordShow: !this.state.passwordShow })}
              >비밀번호 내용 보기</Button>
            </Modal.Body>
            <Modal.Footer>
              <div style={styles.buttons}>
                <Button
                  bsStyle="info"
                  bsSize="large"
                  type="submit"
                  onClick={this.handleModify}
                >수정</Button>
              </div>
              <Button bsSize="large" onClick={this.props.close}>닫기</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}
CustomerSideBaseModal.propTypes = {
  show: PropTypes.bool,
};
CustomerSideBaseModal.defaultProps = {
  show: true,
};
export default CustomerSideBaseModal;
