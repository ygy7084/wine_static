/* global FileReader */
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';

const styles = {
  header: {
    textAlign: 'center',
  },
};
const TableModal = function TableModal(props) {
  return (
    <div>
      <Modal
        show
        bsSize="lg"
      >
        <ModalHeader style={styles.header}>
          <h1>{props.title}</h1>
          <h4>{props.subtitle}</h4>
        </ModalHeader>
        <ModalBody>
          {props.children}
        </ModalBody>
        <ModalFooter>
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
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default TableModal;
