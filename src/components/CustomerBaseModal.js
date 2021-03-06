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

const styles = {
  header: {
    textAlign: 'center',
  },
  buttons: {
    display: 'inline-block',
    marginRight: '10px',
  },
};
class CustomerBaseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (this.props.mode === 'modify' && this.props.item) {
      this.state = {
        modifyMode: false,
        name: this.props.item.name,
        phone: this.props.item.phone,
        email: this.props.item.email,
        address: this.props.item.address,
        level: this.props.item.level,
      };
    } else {
      this.state = {
        name: '',
        phone: '',
        email: '',
        address: '',
        level: '1',
      };
    }
    this.handleInsert = this.handleInsert.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleInsert() {
    this.props.insert({
      name: this.state.name.trim(),
      phone: this.state.phone.trim(),
      email: this.state.email.trim(),
      address: this.state.address.trim(),
      level: this.state.level.trim(),
    });
  }
  handleModify() {
    this.props.modify({
      _id: this.props.item._id,
      name: this.state.name.trim(),
      phone: this.state.phone.trim(),
      email: this.state.email.trim(),
      address: this.state.address.trim(),
      level: this.state.level.trim(),
    });
  }
  handleRemove() {
    this.props.remove(this.props.item);
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
            </Modal.Header>
            <Modal.Body>
              <FormGroup controlId="formControlsText">
                <ControlLabel>이름</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                  disabled={!this.state.modifyMode && this.props.mode === 'modify'}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>전화번호 (숫자만 입력하여 주십시요.)</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.phone}
                  onChange={e => this.setState({ phone: e.target.value.replace(/\D/g, '') })}
                  disabled={!this.state.modifyMode && this.props.mode === 'modify'}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>이메일</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                  disabled={!this.state.modifyMode && this.props.mode === 'modify'}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>주소</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.address}
                  onChange={e => this.setState({ address: e.target.value })}
                  disabled={!this.state.modifyMode && this.props.mode === 'modify'}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>등급 (임시)</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.level}
                  onChange={e => this.setState({ level: e.target.value })}
                  disabled
                />
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              {
                this.props.mode === 'insert' ?
                  <Button
                    bsStyle="success"
                    bsSize="large"
                    type="submit"
                    onClick={this.handleInsert}
                  >추가</Button> :
                  this.props.mode === 'modify' && !this.props.onlyView ?
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
                          type="submit"
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
          </Form>
        </Modal>
      </div>
    );
  }
}
CustomerBaseModal.propTypes = {
  show: PropTypes.bool,
};
CustomerBaseModal.defaultProps = {
  show: true,
};
export default CustomerBaseModal;
