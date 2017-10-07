/* global QRCode, document */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Alert, ButtonGroup } from 'react-bootstrap';
import Modal from 'react-bootstrap-modal';

const styles = {
  alert: {
    marginBottom: '0px',
  },
  buttons: {
    textAlign: 'right',
  },
};
const CheckModal = function CheckModal(props) {
  return (
    <div>
      <Modal
        show
        onHide={props.handleClose}
      >
        <Alert bsStyle={props.bsStyle} style={styles.alert}>
          <h3>{props.title || 'Title'}</h3>
          <p>{props.subtitle || 'Subtitle'}</p>
          <div style={styles.buttons}>
            <ButtonGroup>
              {
                props.check ?
                  <Button bsSize="large" bsStyle={props.bsStyle} onClick={props.handleCheck}>{props.checkMessage}</Button>
                  : null
              }
              <Button bsSize="large" onClick={props.handleClose}>닫기</Button>
            </ButtonGroup>
          </div>
        </Alert>
      </Modal>
    </div>
  );
};
CheckModal.propTyps = {
  bsStyle: PropTypes.oneOf(['success', 'warning', 'danger', 'info']).isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  check: PropTypes.bool,
  checkMessage: PropTypes.string,
  handleCheck: PropTypes.func,
  handleClose: PropTypes.func.isRequired,
};
CheckModal.defaultProps = {
  title: '',
  subtitle: '',
  check: true,
  handleCheck: undefined,
  checkMessage: '확인',
};
export default CheckModal;
