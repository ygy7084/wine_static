import React from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Form,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import Modal from 'react-bootstrap-modal';
import {
  errorHandler,
} from '../modules';

class EmailConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      host: this.props.configuration.host,
      pwd: this.props.configuration.pwd,
      title: this.props.configuration.title,
      content: this.props.configuration.content,
      testModalOn: false,
      to: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleTest = this.handleTest.bind(this);
  }
  handleInputChange(e, property) {
    switch(property) {
      case 'host':
        this.setState({ host: e.target.value });
        break;
      case 'pwd':
        this.setState({ pwd: e.target.value });
        break;
      case 'title':
        this.setState({ title: e.target.value });
        break;
      case 'content':
        this.setState({ content: e.target.value });
        break;
      case 'to':
        this.setState({ to: e.target.value });
        break;
      default:
    }
  }
  handleModify() {
    if (this.state.content.indexOf('%password%') < 0) {
      errorHandler({ message: '이메일 내용에 %password%를 추가하셔야 합니다.' });
    } else {
      this.props.modify({
        host: this.state.host,
        pwd: this.state.pwd,
        title: this.state.title,
        content: this.state.content,
      });
    }
  }
  handleTest() {
    this.props.test(this.state.to);
  }
  render() {
    return (
      <div>
        <h3>고객 비밀번호 찾기 이메일 설정</h3>
        <p>고객이 비밀번호 찾기를 하였을 때, 이메일을 송신할 주소를 설정합니다.</p>
        <Form>
          <FormGroup controlId="formControlsText">
            <ControlLabel>이메일 주소</ControlLabel>
            <p>Gmail을 입력하셔야 합니다. ex) abc1234@gmail.com</p>
            <FormControl
              type="email"
              value={this.state.host}
              onChange={e => this.handleInputChange(e, 'host')}
            />
          </FormGroup>
          <FormGroup controlId="formControlsText">
            <ControlLabel>이메일 비밀번호</ControlLabel>
            <p>Gmail 계정의 비밀번호를 입력합니다.</p>
            <FormControl
              type="text"
              value={this.state.pwd}
              onChange={e => this.handleInputChange(e, 'pwd')}
            />
          </FormGroup>
          <FormGroup controlId="formControlsText">
            <ControlLabel>제목</ControlLabel>
            <p>메일 제목을 입력합니다.</p>
            <FormControl
              type="text"
              value={this.state.title}
              onChange={e => this.handleInputChange(e, 'title')}
            />
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>내용</ControlLabel>
            <p>메일 내용을 입력합니다. 비밀번호는 %password% 자리에 들어갑니다.</p>
            <FormControl
              componentClass="textarea"
              value={this.state.content}
              onChange={e => this.handleInputChange(e, 'content')}
            />
          </FormGroup>
          <Button bsStyle="info" onClick={() => this.setState({ testModalOn: true })}>이메일 전송 테스트</Button>
          <Button bsStyle="success" onClick={this.handleModify}>상단 수정 내용 입력</Button>
        </Form>
        <Modal
          show={this.state.testModalOn}
          onHide={() => this.setState({ testModalOn: false, to: ''})}
          keyboard
        >
          <Form onSubmit={(e) => e.preventDefault()}>
            <Modal.Header>
              <h3>테스트 이메일을 보낼 주소를 입력하십시요.</h3>
              <p>설정에서 관련 내용을 수정하셨다면 수정 버튼 클릭 후 진행하십시요.</p>
            </Modal.Header>
            <Modal.Body>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>이메일</ControlLabel>
                <FormControl
                  type="email"
                  value={this.state.to}
                  onChange={e => this.handleInputChange(e, 'to')}
                />
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <ButtonGroup>
                <Button bsStyle="success" type="submit" onClick={this.handleTest}>전송</Button>
                <Button onClick={() => this.setState({ testModalOn: false })}>닫기</Button>
              </ButtonGroup>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default EmailConfiguration;
