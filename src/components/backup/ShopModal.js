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
class ShopModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyMode: false,
      name: this.props.shop.name,
      phone: this.props.shop.phone,
      memo: this.props.shop.memo,
    };
    this.handleModify = this.handleModify.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleModify() {
    this.props.shopModify({
      _id: this.props.shop._id,
      name: this.state.name,
      phone: this.state.phone,
      memo: this.state.memo,
    });
  }
  handleRemove() {
    this.props.shopRemove({ _id: this.props.shop._id });
  }
  render() {
    return (
      <div>
        <Modal
          show
        >
          <ModalHeader style={styles.header}>
            <h1>매장 정보</h1>
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
                <ControlLabel>메모</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.memo}
                  onChange={e => this.setState({ memo: e.target.value })}
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

export default ShopModal;
