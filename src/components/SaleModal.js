import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ControlLabel,
  Form,
  FormGroup,
  FormControl,
  Image,
} from 'react-bootstrap';
import Modal from 'react-bootstrap-modal';
import {
  errorHandler,
  configure,
} from '../modules';
import {
  TableModal,
  ShopList,
} from './';

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
class SaleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (this.props.mode === 'modify' && this.props.item) {
      this.state = {
        modifyMode: false,
        price: this.props.item.price,
        lowestPrice: this.props.item.lowestPrice,
        wholeSalePrice: this.props.item.wholeSalePrice,
        vintage: this.props.item.vintage,
        shop: this.props.item.shop,
        shopModalOn: false,
      };
    } else {
      this.state = {
        price: '',
        lowestPrice: '',
        wholeSalePrice: '',
        shop: null,
        shopModalOn: false,
      };
    }
    this.handleNumberInput = this.handleNumberInput.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleNumberInput(e, prop) {
    let value = parseInt(e.target.value.replace(/\D/g, ''), 10);
    if (!value || value < 0) {
      value = 0;
    }
    const state = {};
    state[prop] = value;
    this.setState(state);
  }
  handleInsert() {
    if (!this.state.shop || !this.state.shop._id) {
      errorHandler({ message: '매장 선택이 잘못되었습니다. ' });
    } else {
      this.props.insert({
        vintage: this.props.vintage._id,
        shop: this.state.shop._id,
        price: this.state.price,
        lowestPrice: this.state.lowestPrice,
        wholeSalePrice: this.state.wholeSalePrice,
      });
    }
  }
  handleModify() {
    this.props.modify({
      _id: this.props.item._id,
      vintage: this.state.vintage._id,
      shop: this.state.shop._id,
      price: this.state.price,
      lowestPrice: this.state.lowestPrice,
      wholeSalePrice: this.state.wholeSalePrice,
    });
  }
  handleRemove() {
    this.props.remove(this.props.item);
  }
  render() {
    let vintage;
    let original;
    if (this.props.mode === 'modify') {
      vintage = this.props.item.vintage;
      if (!vintage) {
        return null;
      }
      original = vintage.original;
    } else if (this.props.mode === 'insert') {
      vintage = this.props.vintage;
      if (!vintage) {
        return null;
      }
      original = vintage.original;
    }
    if (!original) {
      return null;
    }
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.close}
        >
          <Modal.Header style={styles.header}>
            <h1>{this.props.title}</h1>
          </Modal.Header>
          <Modal.Body>
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
                <ControlLabel>빈티지</ControlLabel>
                <FormControl
                  type="number"
                  value={vintage ? vintage.vintage : ''}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>도매가</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.wholeSalePrice}
                  onChange={e => this.handleNumberInput(e, 'wholeSalePrice')}
                  disabled={!this.state.modifyMode && this.props.mode === 'modify'}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>판매가</ControlLabel>
                <FormControl
                  type="number"
                  value={this.state.price}
                  onChange={e => this.handleNumberInput(e, 'price')}
                  disabled={!this.state.modifyMode && this.props.mode === 'modify'}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>최저가</ControlLabel>
                <FormControl
                  type="number"
                  value={this.state.lowestPrice}
                  onChange={e => this.handleNumberInput(e, 'lowestPrice')}
                  disabled={!this.state.modifyMode && this.props.mode === 'modify'}
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
                onClick={() => this.setState({ shopModalOn: true })}
                disabled={!this.state.modifyMode && this.props.mode === 'modify'}
              >상품에 매장 연결</Button>
            </Form>
            {
              this.props.imageView ?
                <Image
                  style={styles.image}
                  src={`${configure.imagePath}${original.photo_url}?${new Date().getTime()}`}
                  responsive
                /> : null
            }
          </Modal.Body>
          <Modal.Footer>
            {
              this.props.mode === 'insert' ?
                <Button
                  bsStyle="success"
                  bsSize="large"
                  onClick={this.handleInsert}
                >추가</Button> :
                this.props.mode === 'modify' && !this.props.onlyView ?
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
                        onClick={this.handleModify}
                      >수정</Button>
                      <Button
                        bsStyle="warning"
                        bsSize="large"
                        onClick={this.handleRemove}
                      >삭제</Button>
                    </div>
                  : null
            }
            <Button bsSize="large" onClick={this.props.close}>닫기</Button>
          </Modal.Footer>
        </Modal>
        <TableModal
          show={this.state.shopModalOn}
          title="매장 선택"
          subtitle="상품을 연결할 매장을 선택하십시요."
          close={() => this.setState({ shopModalOn: false })}
        >
          <ShopList
            onlyView
            structure={this.props.shopStructure}
            rowClick={(item) => {
              this.setState({
                shopModalOn: false,
                shop: item,
              });
            }}
            list={this.props.shopList}
          />
        </TableModal>
      </div>
    );
  }
}
SaleModal.propTypes = {
  show: PropTypes.bool,
};
SaleModal.defaultProps = {
  show: true,
};
export default SaleModal;
