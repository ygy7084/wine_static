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
class VintageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (this.props.mode === 'modify' && this.props.item) {
      this.state = {
        vintage: this.props.item.vintage,
        modifyMode: false,
      };
    } else {
      this.state = {
        vintage: '',
      };
    }
    this.handleVintageInput = this.handleVintageInput.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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
  handleInsert() {
    this.props.insert({
      original: this.props.original._id,
      vintage: this.state.vintage,
    });
  }
  handleModify() {
    this.props.modify({
      _id: this.props.item._id,
      vintage: this.state.vintage,
    });
  }
  handleRemove() {
    this.props.remove(this.props.item);
  }
  render() {
    let original;
    if (this.props.mode === 'modify') {
      original = this.props.item.original;
    } else if (this.props.mode === 'insert') {
      original = this.props.original;
    }
    if (!original) {
      return null;
    }
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.close}
          keyboard
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
                  disabled={!this.state.modifyMode && this.props.mode === 'modify'}
                />
              </FormGroup>
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
      </div>
    );
  }
}
VintageModal.propTypes = {
  show: PropTypes.bool,
  imageView: PropTypes.bool,
  onlyView: PropTypes.bool,
};
VintageModal.defaultProps = {
  show: true,
  imageView: false,
  onlyView: false,
};
export default VintageModal;
