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
};
class CompleteSaleModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { sale } = this.props;
    if (!sale) {
      return null;
    }
    const { vintage } = sale;
    if (!vintage) {
      return null;
    }
    const { original } = vintage;
    if (!original) {
      return null;
    }
    return (
      <div>
        <Modal
          animation={false}
          show
        >
          <ModalHeader style={styles.header}>
            <h1>상품 정보</h1>
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
                  value={original.eng_shortname}
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
                  value={vintage.vintage}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>도매가</ControlLabel>
                <FormControl
                  type="number"
                  value={sale.wholeSalePrice}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>판매가</ControlLabel>
                <FormControl
                  type="number"
                  value={sale.price}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>최저가</ControlLabel>
                <FormControl
                  type="number"
                  value={sale.lowestPrice}
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


export default CompleteSaleModal;
