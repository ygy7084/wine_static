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

import { TableModal, ShopList } from './';
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
    this.state = {};
    if (
      this.props.mode === 'modify' &&
      this.props.item) {
      this.state = {
        username: this.props.item.username,
        password: this.props.item.password,
        passwordCheck: '',
        name: this.props.item.name,
        level: this.props.item.level || '관리자',
        shop: this.props.item.shop,
        shopModalOn: false,
        modifyMode: false,
      };
    } else {
      this.state = {
        username: '',
        password: '',
        passwordCheck: '',
        name: '',
        level: '관리자',
        shopModalOn: false,
        shop: null,
      };
    }
    this.handleInsert = this.handleInsert.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleInsert() {
    if (this.state.password === this.state.passwordCheck) {
      this.props.insert({
        username: this.state.username.trim(),
        password: this.state.password.trim(),
        name: this.state.name.trim(),
        level: this.state.level.trim(),
        shop: this.state.shop && this.state.level.trim() === '매장'
          ? this.state.shop._id : null,
      });
    } else {
      errorHandler({
        message: '비밀번호와 비밀번호 확인 값을 올바르게 입력해주십시요.',
      });
    }
  }
  handleModify() {
    if (this.state.password === this.state.passwordCheck) {
      this.props.modify({
        _id: this.props.item._id,
        username: this.state.username.trim(),
        password: this.state.password.trim(),
        name: this.state.name.trim(),
        level: this.state.level.trim(),
        shop: this.state.shop && this.state.level.trim() === '매장'
          ? this.state.shop._id : null,
      });
    } else {
      errorHandler({
        message: '비밀번호와 비밀번호 확인 값을 올바르게 입력해주십시요.',
      });
    }
  }
  handleRemove() {
    if (this.state.password === this.state.passwordCheck) {
      this.props.remove({ _id: this.props.item._id });
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
          keyboard
        >
          <Modal.Header style={styles.header}>
            <h1>{this.props.title}</h1>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup controlId="formControlsText">
                <ControlLabel>ID</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.username}
                  disabled={!this.state.modifyMode && this.props.mode === 'modify'}
                  onChange={e => this.setState({ username: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>비밀번호</ControlLabel>
                <FormControl
                  type="password"
                  value={this.state.password}
                  disabled={!this.state.modifyMode && this.props.mode === 'modify'}
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
                  type="password"
                  value={this.state.passwordCheck}
                  disabled={!this.state.modifyMode && this.props.mode === 'modify'}
                  onChange={e => this.setState({ passwordCheck: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>이름</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.name}
                  disabled={!this.state.modifyMode && this.props.mode === 'modify'}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>권한</ControlLabel>
                <FormControl
                  componentClass="select"
                  onChange={(e) => {
                    const value = e.target.value;
                    this.setState({
                      level: e.target.value,
                      shop: value === '관리자' ? null : this.state.shop,
                    });
                  }}
                  value={this.state.level}
                  disabled={!this.state.modifyMode && this.props.mode === 'modify'}
                >
                  <option value="관리자">관리자</option>
                  <option value="매장">매장</option>
                </FormControl>
              </FormGroup>
              {
                this.state.level === '매장' ?
                  <div>
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
                          }}
                          disabled={!this.state.modifyMode && this.props.mode === 'modify'}
                        >매장 연결 지우기</Button>
                        :
                        <Button
                          bsStyle="success"
                          onClick={() => this.setState({ shopModalOn: true })}
                          disabled={!this.state.modifyMode && this.props.mode === 'modify'}
                        >계정에 매장 연결</Button>
                    }
                  </div> : null
              }
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {
              this.props.mode === 'insert' ?
                <Button
                  bsStyle="success"
                  bsSize="large"
                  onClick={this.handleInsert}
                >추가</Button> :
                this.props.mode === 'modify' ?
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
                  : null
            }
            <Button bsSize="large" onClick={this.props.close}>닫기</Button>
          </Modal.Footer>
        </Modal>
        <TableModal
          title="매장 선택"
          subtitle="계정을 연결할 매장을 선택하십시요."
          show={this.state.shopModalOn}
          close={() => this.setState({ shopModalOn: false })}
        >
          <ShopList
            onlyView
            list={this.props.shopList}
            structure={this.props.shopStructure}
            rowClick={shop => this.setState({ shop, shopModalOn: false })}
          />
        </TableModal>
      </div>
    );
  }
}
AccountModal.propTypes = {
  show: PropTypes.bool,
};
AccountModal.defaultProps = {
  show: true,
};
export default AccountModal;
