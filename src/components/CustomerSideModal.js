import React from 'react';
import { Button, ControlLabel, Form, FormGroup, FormControl, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';

const styles = {
  select: {
    fontSize: '3rem',
    height: '50px',
  },
};
const CustomerSideModal = function CustomerSideModal(props) {
  return (
    <div>
      <Modal
        show={props.toggle}
      >
        <ModalBody>
          <Form>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>현재 모드</ControlLabel>
              <FormControl
                componentClass="select"
                style={styles.select}
                onChange={e => props.selectMode(e.target.value)}
                value={props.mode}
              >
                <option value="입고 와인 조회">입고 와인 조회</option>
                <option value="입출고 내역 조회">입출고 내역 조회</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>매장별 조회</ControlLabel>
              <FormControl
                componentClass="select"
                style={styles.select}
                onChange={e => props.selectShop(e.target.value)}
                value={props.shop}
              >
                <option value="전체">전체</option>
                <option value="A 매장">A 매장</option>
              </FormControl>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button bsSize="large" onClick={props.close}>닫기</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CustomerSideModal;
