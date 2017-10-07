import React from 'react';
import { Button, ControlLabel, Form, FormGroup, FormControl, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';

const styles = {
  header: {
    textAlign: 'center',
  },
  buttons: {
    display: 'inline-block',
    marginRight: '10px',
  },
};
class CustomerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyMode: false,
      name: this.props.customer.name,
      phone: this.props.customer.phone,
      email: this.props.customer.email,
      address: this.props.customer.address,
    };
    this.customerModify = this.customerModify.bind(this);
    this.customerRemove = this.customerRemove.bind(this);
  }
  customerModify() {
    this.props.customerModify({
      _id: this.props.customer._id,
      name: this.state.name.trim(),
      phone: this.state.phone.trim(),
      email: this.state.email.trim(),
      address: this.state.address.trim(),
    });
  }
  customerRemove() {
    this.props.customerRemove({ _id: this.props.customer._id });
  }
  render() {
    return (
      <div>
        <Modal
          animation={false}
          show
        >
          <ModalHeader style={styles.header}>
            <h1>고객 정보</h1>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup controlId="formControlsText">
                <ControlLabel>이름</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                  disabled={!this.state.modifyMode}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>전화번호 (숫자만 입력하여 주십시요.)</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.phone}
                  onChange={e => this.setState({ phone: e.target.value.replace(/\D/g, '') })}
                  disabled={!this.state.modifyMode}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>이메일</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                  disabled={!this.state.modifyMode}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>주소</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.address}
                  onChange={e => this.setState({ address: e.target.value })}
                  disabled={!this.state.modifyMode}
                />
              </FormGroup>
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
                    onClick={this.customerModify}
                  >수정</Button>
                  <Button
                    bsStyle="warning"
                    bsSize="large"
                    onClick={this.customerRemove}
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


export default CustomerModal;
