import React from 'react';
import Modal from 'react-bootstrap-modal';
import { Button, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';

const styles = {
  select: {
    fontSize: '2rem',
    height: '50px',
  },
};
const CustomerSideModal = function CustomerSideModal(props) {
  return (
    <div>
      <Modal
        show={props.toggle}
        onHide={props.close}
        keyboard
      >
        <Modal.Body>
          <Form>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>현재 화면</ControlLabel>
              <FormControl
                componentClass="select"
                style={styles.select}
                onChange={e => props.selectMode(e.target.value)}
                value={props.mode}
              >
                <option value="보관 와인 리스트">보관 와인 리스트</option>
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
                {
                  props.shopList.map(obj =>
                    <option key={obj} value={obj}>{obj}</option>
                  )
                }
              </FormControl>
            </FormGroup>
          </Form>
          <Button
            bsStyle="info"
            onClick={props.baseModalOn}
          >고객 정보 수정</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button bsSize="large" onClick={props.logout}>로그아웃</Button>
          <Button bsStyle="primary" bsSize="large" onClick={props.close}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerSideModal;
