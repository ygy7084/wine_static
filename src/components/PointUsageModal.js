import React from 'react';
import { Button, ControlLabel, Form, FormGroup, FormControl, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';

class PointUsageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      point: 0,
      memo: '',
    };
    this.handlePointChange = this.handlePointChange.bind(this);
    this.handleMemoChange = this.handleMemoChange.bind(this);
    this.handleUsage = this.handleUsage.bind(this);
  }
  handlePointChange(e) {
    this.setState({ point: Math.abs(parseInt(e.target.value, 10)) });
  }
  handleUsage() {
    this.props.onUsage({
      point: this.state.point,
      memo: this.state.memo,
    });
  }
  handleMemoChange(e) {
    this.setState({ memo: e.target.value });
  }
  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
        >
          <ModalHeader>
            <h1>포인트 사용</h1>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup controlId="formControlsText">
                <ControlLabel>포인트</ControlLabel>
                <FormControl
                  type="number"
                  onChange={this.handlePointChange}
                  value={this.state.point}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>메모</ControlLabel>
                <FormControl
                  type="text"
                  onChange={this.handleMemoChange}
                  value={this.state.memo}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.handleUsage}>사용</Button>
            <Button onClick={this.props.close}>취소</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const styles = {
  memo: {
    resize: 'none',
    height: '20rem',
  },
};

export default PointUsageModal;
