import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap-modal';
import 'react-bootstrap-modal/lib/styles/rbm-patch.css';

import {
  Button,
} from 'react-bootstrap';

const styles = {
  header: {
    textAlign: 'center',
  },
  button: {
    width: '100%',
  },
};
export default function KYModal(props) {
  return (
    <Modal
      small
      show={props.open}
      onHide={props.close}
      keyboard
    >
      {
        props.title ?
          <Modal.Header style={styles.header}>
            <h3>{props.title}</h3>
          </Modal.Header>
          : null
      }
      <Modal.Body style={styles.body}>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={styles.button}
          onClick={props.close}
          bsStyle="warning"
        >닫기</Button>
      </Modal.Footer>
    </Modal>
  );
};