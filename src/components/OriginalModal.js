import React from 'react';
import { Image, Button, ControlLabel, Form, FormGroup, FormControl, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';

class OriginalModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyMode: false,
      eng_fullname: '',
      eng_shortname: '',
      kor_fullname: '',
      kor_shortname: '',
      country: '',
      category: '',
      region: '',
      subregion: '',
      photo_url: '',
      desc: '',
    };
    this.handleModify = this.handleModify.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      this.setState({
        modifyMode: false,
        eng_fullname: nextProps.original.eng_fullname,
        eng_shortname: nextProps.original.eng_shortname,
        kor_fullname: nextProps.original.kor_fullname,
        kor_shortname: nextProps.original.kor_shortname,
        country: nextProps.original.country,
        category: nextProps.original.category,
        region: nextProps.original.region,
        subregion: nextProps.original.subregion,
        photo_url: nextProps.original.photo_url,
        desc: nextProps.original.desc,
      });
    }
  }
  handleModify() {
  }
  handleRemove() {
  }
  render() {
    if(!this.props.original)
      return null;
    return (
      <div>
        <Modal
          show={this.props.toggle}
        >
          <ModalHeader>
            <h1>오리지날 정보</h1>
          </ModalHeader>
          <ModalBody>
            <Image src={this.props.original.photo_url} responsive />

            <Form>
              <FormGroup controlId="formControlsFile">
                <ControlLabel>이미지</ControlLabel>
                <FormControl
                  type="file"
                  label="File"
                  disabled
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>영문 풀네임</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.eng_fullname}
                  onChange={e => this.setState({ eng_fullname: e.target.value })}
                  disabled={!this.state.modifyMode}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>영문 줄임명</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.eng_shortname}
                  onChange={e => this.setState({ eng_shortname: e.target.value })}
                  disabled={!this.state.modifyMode}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>한글 풀네임</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.kor_fullname}
                  onChange={e => this.setState({ kor_fullname: e.target.value })}
                  disabled={!this.state.modifyMode}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>한글 줄임명</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.kor_shortname}
                  onChange={e => this.setState({ kor_shortname: e.target.value })}
                  disabled={!this.state.modifyMode}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>종류</ControlLabel>
                <FormControl
                  type="text"
                  value=''
                  disabled={!this.state.modifyMode}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>지역</ControlLabel>
                <FormControl
                  type="text"
                  value=''
                  disabled={!this.state.modifyMode}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>품종</ControlLabel>
                <FormControl
                  type="text"
                  value=''
                  disabled={!this.state.modifyMode}
                />
              </FormGroup>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>설명</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.desc}
                  onChange={e => this.setState({ desc: e.target.value })}
                  disabled={!this.state.modifyMode}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            {
              this.state.modifyMode === false ?
                <Button
                  bsStyle="primary"
                  bsSize="large"
                  onClick={() => this.setState({ modifyMode: true })}
                >수정 또는 삭제</Button> :
                <div style={{ display: 'inline-block', marginRight: '10px', }}>
                  <Button
                    bsStyle="info"
                    bsSize="large"
                    onClick={this.handleModify}
                  >수정</Button>
                  <Button
                    bsStyle="warning"
                    bsSize="large"
                    onClick={this.handleRemove}
                  >삭제</Button>
                </div>
            }
            <Button bsSize="large" onClick={this.props.close}>닫기</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default OriginalModal;
