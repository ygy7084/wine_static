/* global FileReader */
import React from 'react';
import { Image, Button, ControlLabel, Form, FormGroup, FormControl, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import { configure } from '../modules';

const styles = {
  header: {
    textAlign: 'center',
  },
  buttons: {
    display: 'inline-block',
    marginRight: '10px',
  },
  image: {
    height: 'auto',
    width: '100%',
    margin: 'auto',
  },
};
class OriginalModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyMode: false,
      file: '',
      photo_url: this.props.original.photo_url && this.props.original.photo_url !== '' ?
        `${configure.imagePath}${this.props.original.photo_url}?${new Date().getTime()}` : '',
      photo_changed: false,
      categoryOptions: ['레드', '화이트', '스파클링'],
      grapeOptions: this.props.grapes,
      countryOptions: this.props.locations.country,
      regionOptions:
        Object.prototype.hasOwnProperty.call(
          this.props.locations.region,
          this.props.original.country,
        ) ?
          this.props.locations.region[this.props.original.country] :
          [],
      subregionOptions:
        Object.prototype.hasOwnProperty.call(
          this.props.locations.subregion,
          `${this.props.original.country}${this.props.original.region}`,
        ) ?
          this.props.locations.subregion[`${this.props.original.country}${this.props.original.region}`] :
          [],
      eng_fullname: this.props.original.eng_fullname,
      eng_shortname: this.props.original.eng_shortname,
      kor_fullname: this.props.original.kor_fullname,
      kor_shortname: this.props.original.kor_shortname,
      category: this.props.original.category,
      country: this.props.original.country,
      region: this.props.original.region,
      subregion: this.props.original.subregion,
      grape_race: this.props.original.grape_race,
      desc: this.props.original.desc,
    };
    this.handleCountryInputChange = this.handleCountryInputChange.bind(this);
    this.handleRegionInputChange = this.handleRegionInputChange.bind(this);
    this.handleGrapeInputChange = this.handleGrapeInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.originalModify = this.originalModify.bind(this);
    this.originalRemove = this.originalRemove.bind(this);
  }
  handleCountryInputChange(e) {
    const input = e.target.value;
    this.setState({//
      country: input,
      region: '',
      subregion: '',
      regionOptions:
        Object.prototype.hasOwnProperty.call(this.props.locations.region, input) ?
          this.props.locations.region[input] :
          [],
    });
  }
  handleRegionInputChange(e) {
    const input = e.target.value;
    this.setState({
      region: input,
      subregion: '',
      subregionOptions:
        Object.prototype.hasOwnProperty.call(
          this.props.locations.subregion,
          `${this.state.country}${input}`) ?
          this.props.locations.subregion[`${this.state.country}${input}`] :
          [],
    });
  }
  handleGrapeInputChange(e) {
    const index = this.state.grape_race.findIndex(obj => obj === e.target.value);
    const grape_race = this.state.grape_race.slice();
    if (index < 0) {
      grape_race.push(e.target.value);
    } else {
      grape_race.splice(index, 1);
    }
    grape_race.sort();
    this.setState({ grape_race });
  }
  handleImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file,
        photo_url: reader.result,
        photo_changed: true,
      });
    };
    reader.readAsDataURL(file);
  }
  originalModify() {
    this.props.handleModify({
      _id: this.props.original._id,
      eng_fullname: this.state.eng_fullname,
      eng_shortname: this.state.eng_shortname,
      kor_fullname: this.state.kor_fullname,
      kor_shortname: this.state.kor_shortname,
      category: this.state.category,
      country: this.state.country,
      region: this.state.region,
      subregion: this.state.subregion,
      grape_race: this.state.grape_race,
      desc: this.state.desc,
    }, this.state.photo_changed ? this.state.file : null);
  }
  originalRemove() {
    this.props.handleRemove(this.props.original);
  }
  render() {
    let grapeString = '';
    for (let i = 0; i < this.state.grape_race.length; i += 1) {
      grapeString += this.state.grape_race[i];
      if (i < this.state.grape_race.length - 1) {
        grapeString += '/';
      }
    }
    return (
      <div>
        <Modal
          show
          animation={false}
        >
          <ModalHeader style={styles.header}>
            <h1>오리지날 정보</h1>
          </ModalHeader>
          <ModalBody>
            <Image src={this.state.photo_url} style={styles.image} responsive />
            <Form>
              <FormGroup controlId="formControlsFile">
                <ControlLabel>이미지</ControlLabel>
                <FormControl
                  type="file"
                  label="File"
                  onChange={this.handleImageChange}
                  disabled={!this.state.modifyMode}
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
                  componentClass="select"
                  placeholder="선택"
                  value={this.state.category}
                  onChange={e => this.setState({ category: e.target.value })}
                  disabled={!this.state.modifyMode}
                >
                  <option value="">선택</option>
                  {
                    this.state.categoryOptions.map(obj =>
                      <option
                        key={obj}
                        value={obj}
                      >{obj}</option>,
                    )
                  }
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>국가</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.country}
                  onChange={this.handleCountryInputChange}
                  disabled={!this.state.modifyMode}
                >
                  <option value="">
                    선택
                  </option>
                  {
                    this.state.countryOptions.map(obj =>
                      <option
                        key={obj}
                        value={obj}
                      >{obj}</option>,
                    )
                  }
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>지역</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.region}
                  onChange={this.handleRegionInputChange}
                  disabled={!this.state.modifyMode}
                >
                  <option value="">
                    선택
                  </option>
                  {
                    this.state.regionOptions.map(obj =>
                      <option
                        key={obj}
                        value={obj}
                      >{obj}</option>,
                    )
                  }
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>세부지역</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.subregion}
                  onChange={e => this.setState({ subregion: e.target.value })}
                  disabled={!this.state.modifyMode}
                >
                  <option value="">
                    선택
                  </option>
                  {
                    this.state.subregionOptions.map(obj =>
                      <option
                        key={obj}
                        value={obj}
                      >{obj}</option>,
                    )
                  }
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>품종</ControlLabel>
                <FormControl
                  type="text"
                  value={grapeString}
                  disabled
                />
                <FormControl
                  componentClass="select"
                  placeholder="선택"
                  value=""
                  onChange={this.handleGrapeInputChange}
                  disabled={!this.state.modifyMode}
                >
                  <option value="">
                    선택
                  </option>
                  {
                    this.state.grapeOptions.map(obj =>
                      <option
                        key={obj.name}
                        value={obj.name}
                      >{obj.name}</option>,
                    )
                  }
                </FormControl>
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
                <div style={styles.buttons}>
                  <Button
                    bsStyle="info"
                    bsSize="large"
                    onClick={this.originalModify}
                  >수정</Button>
                  <Button
                    bsStyle="warning"
                    bsSize="large"
                    onClick={this.originalRemove}
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
