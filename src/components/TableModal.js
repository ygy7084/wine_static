import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap-modal';

import {
  Button,
} from 'react-bootstrap';

const styles = {
  header: {
    textAlign: 'center',
  },
};
const TableModal = function TableModal(props) {
  return (
    <div>
      <Modal
        show={props.show}
        large
        keyboard
        onHide={props.close}
      >
        <Modal.Header style={styles.header}>
          <h1>{props.title}</h1>
          <h4>{props.subtitle}</h4>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
        <Modal.Footer>
          {
            props.check ?
              <Button
                bsSize="large"
                bsStyle="primary"
                onClick={props.check}
              >
                {
                  props.checkMessage
                }
              </Button>
              : null
          }
          <Button
            bsSize="large"
            onClick={
              props.close ? props.close :
                (e) => {
                  e.stopPropagation();
                  props.history.goBack();
                }
            }
          >닫기</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
TableModal.propTypes = {
  show: PropTypes.bool,
};
TableModal.defaultProps = {
  show: true,
};
export default TableModal;
