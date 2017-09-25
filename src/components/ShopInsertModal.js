import React from 'react';
import { Button, ControlLabel, Form, FormGroup, FormControl, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import { errorHandler } from '../modules';

const styles = {
  header: {
    textAlign: 'center',
  },
};
class ShopInsertModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      memo: '',
    };
    this.handleInsert = this.handleInsert.bind(this);
  }
  handleInsert() {
    this.props.shopInsert({
      name: this.state.name,
      phone: this.state.phone,
      memo: this.state.memo,
    });
  }
  render() {
    return (
      <div>
        <Modal
          show
          animation={false}
        >
          <ModalHeader style={styles.header}>
            <h1>매장 추가</h1>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup controlId="formControlsText">
                <ControlLabel>이름</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>전화번호</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.phone}
                  onChange={e => this.setState({ phone: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>메모</ControlLabel>
                <FormControl
                  type="textarea"
                  value={this.state.memo}
                  onChange={e => this.setState({ memo: e.target.value })}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              bsStyle="success"
              bsSize="large"
              onClick={this.handleInsert}
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


export default ShopInsertModal;
