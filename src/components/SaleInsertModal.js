import React from 'react';
import { Button, ControlLabel, Form, FormGroup, FormControl, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import { errorHandler } from '../modules';

const styles = {
  header: {
    textAlign: 'center',
  },
};
class SaleInsertModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '',
      lowestPrice: '',
      wholeSalePrice: '',
      shop: null,
    };
    this.handlePriceInput = this.handlePriceInput.bind(this);
    this.handleWholeSalePriceInput = this.handleWholeSalePriceInput.bind(this);
    this.handleLowestPriceInput = this.handleLowestPriceInput.bind(this);
    this.saleInsert = this.saleInsert.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ shop: nextProps.shop });
  }
  handlePriceInput(e) {
    let value = e.target.value;
    if (parseInt(value, 10) < 0) {
      value = '0';
    }
    this.setState({
      price: value,
    });
  }
  handleLowestPriceInput(e) {
    let value = e.target.value;
    if (parseInt(value, 10) < 0) {
      value = '0';
    }
    this.setState({
      lowestPrice: value,
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
  saleInsert() {
    if (!this.state.shop || !this.state.shop._id) {
      errorHandler({ message: '매장 선택이 잘못되었습니다. ' });
    } else {
      this.props.saleInsert({
        vintage: this.props.vintage._id,
        shop: this.state.shop._id,
        price: this.state.price,
        lowestPrice: this.state.lowestPrice,
        wholeSalePrice: this.state.wholeSalePrice,
      });
    }
  }
  render() {
    const { vintage } = this.props;
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
          show
          animation={false}
        >
          <ModalHeader style={styles.header}>
            <h1>상품 추가</h1>
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
                  value={this.state.wholeSalePrice}
                  onChange={e => this.setState({ wholeSalePrice: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>판매가</ControlLabel>
                <FormControl
                  type="number"
                  value={this.state.price}
                  onChange={this.handlePriceInput}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>최저가</ControlLabel>
                <FormControl
                  type="number"
                  value={this.state.lowestPrice}
                  onChange={this.handleLowestPriceInput}
                />
              </FormGroup>
              <hr />
              <FormGroup controlId="formControlsText">
                <ControlLabel>매장 이름</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.shop ? this.state.shop.name : ''}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>매장 전화번호</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.shop ? this.state.shop.phone : ''}
                  disabled
                />
              </FormGroup>
              <Button
                bsStyle="success"
                onClick={this.props.shopSelectClick}
              >상품에 매장 연결</Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              bsStyle="success"
              bsSize="large"
              onClick={this.saleInsert}
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


export default SaleInsertModal;
