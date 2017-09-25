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
class VintageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vintage: this.props.vintage.vintage,
      wholeSalePrice: this.props.vintage.wholeSalePrice,
      modifyMode: false,
    };
    this.handleVintageInput = this.handleVintageInput.bind(this);
    this.handleWholeSalePriceInput = this.handleWholeSalePriceInput.bind(this);
    this.vintageModify = this.vintageModify.bind(this);
    this.vintageRemove = this.vintageRemove.bind(this);
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
  handleWholeSalePriceInput(e) {
    let value = e.target.value;
    if (parseInt(value, 10) < 0) {
      value = '0';
    }
    this.setState({
      wholeSalePrice: value,
    });
  }
  vintageModify() {
    this.props.vintageModify({
      _id: this.props.vintage._id,
      vintage: this.state.vintage,
      wholeSalePrice: this.state.wholeSalePrice,
    });
  }
  vintageRemove() {
    this.props.vintageRemove({ _id: this.props.vintage._id });
  }
  render() {
    console.log(this.props.vintage);
    if (!this.props.vintage)
      return null;
    const { original } = this.props.vintage;
    return (
      <div>
        <Modal
          show
        >
          <ModalHeader style={styles.header}>
            <h1>빈티지 정보</h1>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup controlId="formControlsText">
                <ControlLabel>영문 줄임명</ControlLabel>
                <FormControl
                  type="text"
                  value={original ? original.eng_shortname : ''}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>한글 줄임명</ControlLabel>
                <FormControl
                  type="text"
                  value={original ? original.kor_shortname : ''}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>종류</ControlLabel>
                <FormControl
                  type="text"
                  value={original ? original.category : ''}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>원산지</ControlLabel>
                <FormControl
                  type="text"
                  value={original ? original.locationString : ''}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>품종</ControlLabel>
                <FormControl
                  type="text"
                  value={original ? original.grapeString : ''}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>빈티지</ControlLabel>
                <FormControl
                  type="number"
                  value={this.state.vintage}
                  onChange={e => this.setState({ vintage: e.target.value })}
                  disabled={!this.state.modifyMode}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>도매가</ControlLabel>
                <FormControl
                  type="number"
                  value={this.state.wholeSalePrice}
                  onChange={e => this.setState({ wholeSalePrice: e.target.value })}
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
                    onClick={this.vintageModify}
                  >수정</Button>
                  <Button
                    bsStyle="warning"
                    bsSize="large"
                    onClick={this.vintageRemove}
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


export default VintageModal;
