/* global QRCode, document */
import React from 'react';
import { Button, Alert, ButtonGroup, Modal } from 'react-bootstrap';

const styles = {
  alert: {
    marginBottom: '0px',
  },
  buttons: {
    textAlign: 'right',
  },
};
const RemoveModal = function RemoveModal(props) {
  return (
    <div>
      <Modal
        show
      >
        <Alert bsStyle="danger" style={styles.alert}>
          <h3>{props.title || 'Title'}</h3>
          <p>{props.subtitle || 'Subtitle'}</p>
          <div style={styles.buttons}>
            <ButtonGroup>
              <Button bsSize="large" bsStyle="danger" onClick={props.handleRemove}>삭제</Button>
              <Button bsSize="large" onClick={props.handleClose}>닫기</Button>
            </ButtonGroup>
          </div>
        </Alert>
      </Modal>
    </div>
  );
};

export default RemoveModal;
