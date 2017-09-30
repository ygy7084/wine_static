import React from 'react';
import { Button, ControlLabel, Form, FormGroup, FormControl, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import { errorHandler } from '../modules';

const styles = {
  header: {
    textAlign: 'center',
  },
};
class CustomerInsertModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
      address: '',
      grade: '',
    };
    this.customerInsert = this.customerInsert.bind(this);
  }
  customerInsert() {
    this.props.customerInsert({
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address,
      grade: this.state.grade,
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
            <h1>고객 추가</h1>
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
                <ControlLabel>이메일</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>주소</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.address}
                  onChange={e => this.setState({ address: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>등급</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.grade}
                  onChange={e => this.setState({ grade: e.target.value })}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              bsStyle="success"
              bsSize="large"
              onClick={this.customerInsert}
            >추가</Button>
            <Button
              bsSize="large"
              onClick={() => {
                this.props.close();
              }}
            >닫기</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default CustomerInsertModal;
