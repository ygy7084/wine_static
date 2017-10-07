import React from 'react';
import { Button, ControlLabel, Form, FormGroup, FormControl, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';

const styles = {
  header: {
    textAlign: 'center',
  },
};
class VintageInsertModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vintage: '',
    };
    this.handleVintageInput = this.handleVintageInput.bind(this);
    this.vintageInsert = this.vintageInsert.bind(this);
  }
  handleVintageInput(e) {
    let value = e.target.value;
    if (parseInt(value, 10) < 1) {
      value = '1';
    }
    this.setState({
      vintage: value,
    });
  }
  vintageInsert() {
    this.props.vintageInsert({
      original: this.props.original._id,
      vintage: this.state.vintage,
    });
  }
  render() {
    const { original } = this.props;
    if (!original) {
      return null;
    }
    return (
      <div>
        <Modal
          show
          animation={false}
        >
          <ModalHeader style={styles.header}>
            <h1>빈티지 추가</h1>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup controlId="formControlsText">
                <ControlLabel>영문 줄임명</ControlLabel>
                <FormControl
                  type="text"
                  value={original.eng_shortname}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>한글 줄임명</ControlLabel>
                <FormControl
                  type="text"
                  value={original.kor_shortname}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>종류</ControlLabel>
                <FormControl
                  type="text"
                  value={original.category}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>원산지</ControlLabel>
                <FormControl
                  type="text"
                  value={original.locationString}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>품종</ControlLabel>
                <FormControl
                  type="text"
                  value={original.grapeString}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>빈티지</ControlLabel>
                <FormControl
                  type="number"
                  value={this.state.vintage}
                  onChange={e => this.setState({ vintage: e.target.value })}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              bsStyle="success"
              bsSize="large"
              onClick={this.vintageInsert}
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


export default VintageInsertModal;
