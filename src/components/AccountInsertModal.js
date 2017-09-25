import React from 'react';
import { Button, ControlLabel, Form, FormGroup, FormControl, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import { errorHandler } from '../modules';

const styles = {
  header: {
    textAlign: 'center',
  },
};
class AccountInsertModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordCheck: '',
      name: '',
      level: '관리자',
      shop: null,
    };
    this.accountInsert = this.accountInsert.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ shop: nextProps.shop });
  }
  accountInsert() {
    if (this.state.password === this.state.passwordCheck) {
      this.props.accountInsert({
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
        level: this.state.level,
        shop: this.state.shop ? this.state.shop._id : null,
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
          show
          animation={false}
        >
          <ModalHeader style={styles.header}>
            <h1>계정 추가</h1>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup controlId="formControlsText">
                <ControlLabel>ID</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.username}
                  onChange={e => this.setState({ username: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>비밀번호</ControlLabel>
                <FormControl
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </FormGroup>
              <FormGroup
                controlId="formControlsText"
                validationState={this.state.password !== this.state.passwordCheck ? 'error' : null}
              >
                <ControlLabel>비밀번호 확인</ControlLabel>
                <FormControl
                  type="password"
                  value={this.state.passwordCheck}
                  onChange={e => this.setState({ passwordCheck: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>이름</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>권한</ControlLabel>
                <FormControl
                  componentClass="select"
                  onChange={e => this.setState({ level: e.target.value })}
                  value={this.state.level}
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
                    onClick={this.props.shopUnClick}
                  >매장 연결 지우기</Button>
                  :
                  <Button
                    bsStyle="success"
                    onClick={this.props.shopSelectClick}
                  >계정에 매장 연결</Button>
              }
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              bsStyle="success"
              bsSize="large"
              onClick={this.accountInsert}
            >추가</Button>
            <Button
              bsSize="large"
              onClick={() =>
                this.props.close()
              }
            >닫기</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default AccountInsertModal;
