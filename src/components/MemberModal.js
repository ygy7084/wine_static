import React from 'react';
import { Button, ControlLabel, Form, FormGroup, FormControl, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import {
  PointUsageModal,
  HistoryListModal,
} from './';

class MemberModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: this.props.member.phone,
      point: this.props.member.point,
      name: this.props.member.name,
      birth: this.props.member.birth,
      memo: this.props.member.memo,
      PointUsageModal_show: false,
      HistoryListModalOn: false,
    };
    this.handlePointChange = this.handlePointChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBirthChange = this.handleBirthChange.bind(this);
    this.handleMemoChange = this.handleMemoChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handlePointUsage = this.handlePointUsage.bind(this);
    this.historyListModalOn = this.historyListModalOn.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      this.setState({
        phone: nextProps.member.phone,
        point: nextProps.member.point,
        name: nextProps.member.name,
        birth: nextProps.member.birth,
        memo: nextProps.member.memo,
      });
    }
  }
  handlePointChange(e) {
    const value = parseInt(e.target.value, 10);
    if (value) {
      this.setState({ point: value });
    }
    else {
      this.setState({ point: 0 });
    }
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  handleBirthChange(e) {
    this.setState({ birth: new Date(e.target.value) });
  }
  handleMemoChange(e) {
    this.setState({ memo: e.target.value });
  }
  handleSave() {
    const modified = {};
    modified.phone = this.props.member.phone;
    modified.point = this.state.point;
    modified.name = this.state.name;
    modified.birth = this.state.birth;
    modified.memo = this.state.memo;
    modified.datetime = new Date();

    this.props.save(modified);
  }
  handlePointUsage(data) {
    this.setState({
      PointUsageModal_show: false,
    });
    this.props.pointUsage({
      phone: this.props.member.phone,
      usedPoint: data.point,
      memo: data.memo,
    });
  }
  historyListModalOn() {
    this.props.getHistoryList(this.props.member.phone)
      .then(() => {
        this.setState({
          HistoryListModalOn: true,
        });
      });
  }
  render() {
    const member = JSON.parse(JSON.stringify(this.state));
    if (member) {
      for (const property in member) {
        if (member.hasOwnProperty(property)) {
          if (!member[property]) {
            member[property] = '';
          }
          if (property === 'birth' && member[property] !== '') {
            let month = this.state.birth.getMonth() + 1;
            if (month < 10) { month = `0${month}`; }
            let date = this.state.birth.getDate();
            if (date < 10) { date = `0${date}`; }
            member[property] = `${this.state.birth.getFullYear()}-${month}-${date}`;
          }
        }
      }
    }
    return (
      <div>
        <Modal
          show={this.props.show}
        >
          <ModalHeader>
            <h1>{member.phone}</h1>
          </ModalHeader>
          <ModalBody>
            <h3>기능</h3>
            <Button onClick={()=>{this.setState({PointUsageModal_show:true})}}>포인트 사용</Button>
            <Button onClick={this.historyListModalOn}>포인트 변경 내역</Button>
            <h3>수정</h3>
            <Form>
              <FormGroup controlId="formControlsText">
                <ControlLabel>포인트</ControlLabel>
                <FormControl
                  type="number"
                  onChange={this.handlePointChange}
                  value={member.point}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>이름</ControlLabel>
                <FormControl
                  type="text"
                  onChange={this.handleNameChange}
                  value={member.name}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>기념일</ControlLabel>
                <FormControl
                  type="date"
                  onChange={this.handleBirthChange}
                  value={member.birth}
                />
              </FormGroup>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>메모</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  style={styles.memo}
                  onChange={this.handleMemoChange}
                  value={member.memo}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.handleSave}>Save</Button>
            <Button onClick={this.props.delete}>Delete</Button>
            <Button onClick={this.props.close}>Close</Button>
          </ModalFooter>
          <PointUsageModal
            show={this.state.PointUsageModal_show}
            point={this.props.member.point}
            onUsage={this.handlePointUsage}
            close={()=>{this.setState({PointUsageModal_show:false})}}
          />
          {
            this.state.HistoryListModalOn ?
              <HistoryListModal
                show
                list={this.props.historyList}
                close={()=>{this.setState({HistoryListModalOn: false})}}
              /> :
              null
          }
        </Modal>
      </div>
    );
  }
}

const styles = {
  memo: {
    resize: 'none',
    height: '20rem',
  },
};

export default MemberModal;
