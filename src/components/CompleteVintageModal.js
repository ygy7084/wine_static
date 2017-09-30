import React from 'react';
import { Image, Button, ControlLabel, Form, FormGroup, FormControl, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import { configure } from '../modules';

const styles = {
  header: {
    textAlign: 'center',
  },
  buttons: {
    display: 'inline-block',
    marginRight: '10px',
  },
  image: {
    height: 'auto',
    width: '100%',
    margin: 'auto',
  },
};
class CompleteVintageModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.vintage) {
      return null;
    }
    const { original } = this.props.vintage;
    return (
      <div>
        <Modal
          animation={false}
          show
        >
          <ModalHeader style={styles.header}>
            <h1>빈티지 정보</h1>
          </ModalHeader>
          <ModalBody>
            <Image
              src={`${configure.imagePath}${original.photo_url}?${new Date().getTime()}`}
              style={styles.image}
              responsive
            />
            <Form>
              <FormGroup controlId="formControlsFile">
                <ControlLabel>이미지</ControlLabel>
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>영문 풀네임</ControlLabel>
                <FormControl
                  type="text"
                  value={original ? original.eng_fullname : ''}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>영문 줄임명</ControlLabel>
                <FormControl
                  type="text"
                  value={original ? original.eng_shortname : ''}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>한글 풀네임</ControlLabel>
                <FormControl
                  type="text"
                  value={original ? original.kor_fullname : ''}
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
                  value={this.props.vintage.vintage}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>설명</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={original ? original.desc : ''}
                  disabled
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button bsSize="large" onClick={this.props.close}>닫기</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default CompleteVintageModal;
