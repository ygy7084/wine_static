import React from 'react';
import { Button, ControlLabel, Form, FormGroup, FormControl, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import { errorHandler } from '../modules';

const styles = {
  header: {
    textAlign: 'center',
  },
};
class StoreInsertModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: this.props.customer ? this.props.customer : null,
      shop: this.props.shop ? this.props.shop : null,
      quantityChange: '',
    };
    this.handleStoreInput = this.handleStoreInput.bind(this);
    this.storeInsert = this.storeInsert.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      shop: nextProps.shop,
      customer: nextProps.customer,
    });
  }
  handleStoreInput(e) {
    let value = e.target.value;
    if (parseInt(value, 10) < 0) {
      value = '0';
    }
    this.setState({
      price: value,
    });
  }
  storeInsert() {
    if (!this.state.shop || !this.state.customer || !this.state.quantityChange) {
      errorHandler({ message: '입력이 잘못되었습니다. ' });
    } else {
      this.props.storeInsert({
        sale: this.props.sale ? this.props.sale._id : null,
        shop: this.state.shop._id,
        customer: this.state.customer._id,
        quantityChange: this.state.quantityChange,
      });
    }
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
          show
          animation={false}
        >
          <ModalHeader style={styles.header}>
            <h1>입고</h1>
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
                <ControlLabel>빈티지</ControlLabel>
                <FormControl
                  type="number"
                  value={vintage.vintage}
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
              >매장 선택</Button>
              <hr />
              <FormGroup controlId="formControlsText">
                <ControlLabel>고객 이름</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.customer ? this.state.customer.name : ''}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>고객 전화번호</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.customer ? this.state.customer.phone : ''}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>입고 개수</ControlLabel>
                <FormControl
                  type="number"
                  value={this.state.quantityChange}
                  onChange={e => this.setState({ quantityChange: e.target.value })}
                />
              </FormGroup>
              <Button
                bsStyle="success"
                onClick={this.props.customerSelectClick}
              >고객 선택</Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              bsStyle="success"
              bsSize="large"
              onClick={this.storeInsert}
            >입고</Button>
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


export default StoreInsertModal;
