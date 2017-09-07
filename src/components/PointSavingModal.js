import React from 'react';
import { Modal, ModalBody } from 'react-bootstrap';

class PointSavingModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show}>
        <ModalBody>
          <h2 style={style.title}>
            {`${this.props.inputNumber}님 1점이 적립되었습니다.`}
          </h2>
          <h2 style={style.member}>{`잔여 포인트 : ${this.props.member.point}`}</h2>
        </ModalBody>
      </Modal>
    );
  }
}

const style = {
  title: {
    color: 'black',
    textAlign: 'center',
    marginTop: '125px',
  },
  member: {
    color: 'black',
    textAlign: 'center',
  },
};

export default PointSavingModal;
