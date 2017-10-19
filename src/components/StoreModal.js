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
  TableModal,
  CustomerList,
} from './';
import {
  errorHandler,
  configure,
} from '../modules';

const styles = {
  header: {
    textAlign: 'center',
  },
  buttons: {
    display: 'inline-block',
    marginRight: '10px',
  },
};
// only insertion
class StoreModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: null,
      quantityChange: 0,
    };
    this.handleQuantityChangeInput = this.handleQuantityChangeInput.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
  }
  handleQuantityChangeInput(e) {
    let value = e.target.value;
    if (parseInt(value, 10) < 0) {
      value = '0';
    }
    this.setState({
      price: value,
    });
  }
  handleInsert() {
    if (!this.state.shop || !this.state.customer || !this.state.quantityChange) {
      errorHandler({ message: '입력이 잘못되었습니다. ' });
    } else {
      this.props.handleInsert({
        sale: this.props.sale ? this.props.sale._id : null,
        shop: this.props.sale.shop._id,
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
    const { shop } = this.props.sale;
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
                  value={shop.name}
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>매장 전화번호</ControlLabel>
                <FormControl
                  type="text"
                  value={shop.phone}
                  disabled
                />
              </FormGroup>
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
            <Button
              bsStyle="success"
              bsSize="large"
              onClick={this.handleInsert}
            >입고</Button>
            <Button
              bsSize="large"
              onClick={this.props.close}
            >닫기</Button>
          </Modal.Footer>
        </Modal>
        <TableModal
          show={this.state.customerModalOn}
          title="고객 선택"
          close={() => this.setState({ customerModalOn: false })}
        >
          <CustomerList
            onlyView
            structure={this.props.customerStructure}
            rowClick={(item) => {
              this.setState({
                customerModalOn: false,
                customer: item,
              });
            }}
            list={this.props.customerList}
          />
        </TableModal>
        <TableModal
          show={this.state.customerModalOn}
          title="고객 선택"
          close={() => this.setState({ customerModalOn: false })}
        >
          <CustomerList
            onlyView
            structure={this.props.customerStructure}
            rowClick={(item) => {
              this.setState({
                customerModalOn: false,
                customer: item,
              });
            }}
            list={this.props.customerList}
          />
        </TableModal>
      </div>
    );
  }
}
StoreModal.propTypes = {
  show: PropTypes.bool,
  customer: PropTypes.object,
  sale: PropTypes.object.isRequired,
};
StoreModal.defaultProps = {
  show: true,
  customer: undefined,
};
export default StoreModal;
