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
class StoreModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyMode: false,
      price: this.props.store.price,
      lowestPrice: this.props.store.lowestPrice,
      vintage: this.props.store.vintage,
      shop: this.props.store.shop,
    };
    this.handlePriceInput = this.handlePriceInput.bind(this);
    this.handleLowestPriceInput = this.handleLowestPriceInput.bind(this);
    this.storeModify = this.storeModify.bind(this);
    this.storeRemove = this.storeRemove.bind(this);
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
  storeModify() {
    this.props.storeModify({
      _id: this.props.store._id,
      vintage: this.state.vintage._id,
      shop: this.state.shop._id,
      price: this.state.price,
      lowestPrice: this.state.lowestPrice,
    });
  }
  storeRemove() {
    this.props.storeRemove({ _id: this.props.store._id });
  }
  render() {
    console.log(this.props);
    const { store } = this.props;
    if (!store) {
      return null;
    }
    const { vintage } = store;
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
        >
          <ModalHeader style={styles.header}>
            <h1>상품 정보</h1>
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
                  value={vintage.wholeStorePrice}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>판매가</ControlLabel>
                <FormControl
                  type="number"
                  value={this.state.price}
                  onChange={this.handlePriceInput}
                  disabled={!this.state.modifyMode}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>최저가</ControlLabel>
                <FormControl
                  type="number"
                  value={this.state.lowestPrice}
                  onChange={this.handleLowestPriceInput}
                  disabled={!this.state.modifyMode}
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
                disabled={!this.state.modifyMode}
              >상품에 매장 연결</Button>
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
                    onClick={this.storeModify}
                  >수정</Button>
                  <Button
                    bsStyle="warning"
                    bsSize="large"
                    onClick={this.storeRemove}
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


export default StoreModal;
