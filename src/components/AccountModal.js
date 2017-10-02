import React from 'react';
import { Button, ControlLabel, Form, FormGroup, FormControl, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import { errorHandler } from '../modules';

const styles = {
  header: {
    textAlign: 'center',
  },
  buttons: {
    display: 'inline-block',
    marginRight: '10px',
  },
};
class AccountModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.account.username,
      password: this.props.account.password,
      passwordCheck: '',
      name: this.props.account.name,
      level: this.props.account.level,
      shop: this.props.account.shop,
      modifyMode: false,
    };
    this.handleModify = this.handleModify.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ shop: nextProps.shop });
  }
  handleModify() {
    if (this.state.password === this.state.passwordCheck) {
      this.props.accountModify({
        _id: this.props.account._id,
        username: this.state.username.trim(),
        password: this.state.password.trim(),
        name: this.state.name.trim(),
        level: this.state.level.trim(),
        shop: this.state.shop ? this.state.shop._id : null,
      });
    } else {
      errorHandler({
        message: '비밀번호와 비밀번호 확인 값을 올바르게 입력해주십시요.',
      });
    }
  }
  handleRemove() {
    if (this.state.password === this.state.passwordCheck) {
      this.props.accountRemove({ _id: this.props.account._id });
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
          show
          animation={false}
        >
          <ModalHeader style={styles.header}>
            <h1>계정 정보</h1>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup controlId="formControlsText">
                <ControlLabel>ID</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.username}
                  disabled={!this.state.modifyMode}
                  onChange={e => this.setState({ username: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>비밀번호</ControlLabel>
                <FormControl
                  type="password"
                  value={this.state.password}
                  disabled={!this.state.modifyMode}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </FormGroup>
              <FormGroup
                controlId="formControlsText"
                validationState={this.state.modifyMode && this.state.password !== this.state.passwordCheck ? 'error' : null}
              >
                <ControlLabel>비밀번호 확인</ControlLabel>
                <FormControl
                  type="password"
                  value={this.state.passwordCheck}
                  disabled={!this.state.modifyMode}
                  onChange={e => this.setState({ passwordCheck: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>이름</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.name}
                  disabled={!this.state.modifyMode}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>권한</ControlLabel>
                <FormControl
                  componentClass="select"
                  onChange={e => this.setState({ level: e.target.value })}
                  value={this.state.level}
                  disabled={!this.state.modifyMode}
                >
                  <option value="관리자">관리자</option>
                  <option value="매장">매장</option>
                </FormControl>
              </FormGroup>
              <hr />
              <FormGroup controlId="formControlsText">
                <ControlLabel>매장 이름</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.shop ? this.state.shop.name : ''}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>매장 전화번호</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.shop ? this.state.shop.phone : ''}
                  disabled
                />
              </FormGroup>
              {
                this.state.shop ?
                  <Button
                    bsStyle="warning"
                    onClick={() => {
                      this.setState({ shop: null });
                      this.props.shopUnClick();
                    }}
                    disabled={!this.state.modifyMode}
                  >매장 연결 지우기</Button>
                  :
                  <Button
                    bsStyle="success"
                    onClick={this.props.shopSelectClick}
                    disabled={!this.state.modifyMode}
                  >계정에 매장 연결</Button>
              }
            </Form>
          </ModalBody>
          <ModalFooter>
            {
              this.state.modifyMode === false ?
                <Button
                  bsStyle="primary"
                  bsSize="large"
                  onClick={() => this.setState({ modifyMode: true })}
                >수정 또는 삭제</Button> :
                <div style={styles.buttons}>
                  <Button
                    bsStyle="info"
                    bsSize="large"
                    onClick={this.handleModify}
                  >수정</Button>
                  <Button
                    bsStyle="warning"
                    bsSize="large"
                    onClick={this.handleRemove}
                  >삭제</Button>
                </div>
            }
            <Button bsSize="large" onClick={this.props.close}>닫기</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default AccountModal;
