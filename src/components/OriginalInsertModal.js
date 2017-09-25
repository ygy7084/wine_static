/* global FileReader */
import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import { Image, Button, ControlLabel, Form, FormGroup, FormControl, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';

const styles = {
  header: {
    textAlign: 'center',
  },
  image: {
    height: 'auto',
    width: '100%',
    margin: 'auto',
  },
};
class OriginalInsertModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      photo_url: '',
      categoryOptions: this.props.options.category,
      grapeOptions: this.props.options.grape,
      countryOptions: this.props.options.country,
      regionOptions: [],
      subregionOptions: [],
      eng_fullname: '',
      eng_shortname: '',
      kor_fullname: '',
      kor_shortname: '',
      category: '',
      country: '',
      region: '',
      subregion: '',
      grape_race: [],
      desc: '',
    };
    this.handleCountryInputChange = this.handleCountryInputChange.bind(this);
    this.handleRegionInputChange = this.handleRegionInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.originalInsert = this.originalInsert.bind(this);
  }
  handleCountryInputChange(input) {
    this.setState({
      country: input,
      regionOptions:
        Object.prototype.hasOwnProperty.call(this.props.options.region, input) ?
          this.props.options.region[input] :
          [],
    });
    this.regionInput.getInstance().clear();
    this.subregionInput.getInstance().clear();
  }
  handleRegionInputChange(input) {
    this.setState({
      region: input,
      subregionOptions:
        Object.prototype.hasOwnProperty.call(this.props.options.subregion, `${this.state.country}${input}`) ?
          this.props.options.subregion[`${this.state.country}${input}`] :
          [],
    });
    this.subregionInput.getInstance().clear();
  }
  handleImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file,
        photo_url: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }
  originalInsert() {
    this.props.originalInsert({
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
    }, this.state.file);
  }
  render() {
    return (
      <div>
        <Modal
          show
          animation={false}
        >
          <ModalHeader style={styles.header}>
            <h1>오리지날 추가</h1>
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
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>영문 풀네임</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.eng_fullname}
                  onChange={e => this.setState({ eng_fullname: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>영문 줄임명</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.eng_shortname}
                  onChange={e => this.setState({ eng_shortname: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>한글 풀네임</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.kor_fullname}
                  onChange={e => this.setState({ kor_fullname: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>한글 줄임명</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.kor_shortname}
                  onChange={e => this.setState({ kor_shortname: e.target.value })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>종류</ControlLabel>
                <Typeahead
                  labelKey="category"
                  options={this.state.categoryOptions}
                  selected={[this.state.category]}
                  onInputChange={e => this.setState({ category: e })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>국가</ControlLabel>
                <Typeahead
                  labelKey="country"
                  options={this.state.countryOptions}
                  selected={[this.state.country]}
                  onInputChange={this.handleCountryInputChange}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>지역</ControlLabel>
                <Typeahead
                  labelKey="region"
                  ref={(ref) => { this.regionInput = ref; }}
                  options={this.state.regionOptions}
                  selected={[this.state.region]}
                  onInputChange={this.handleRegionInputChange}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>세부지역</ControlLabel>
                <Typeahead
                  labelKey="subregion"
                  ref={(ref) => { this.subregionInput = ref; }}
                  options={this.state.subregionOptions}
                  selected={[this.state.subregion]}
                  onInputChange={e => this.setState({ subregion: e })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsText">
                <ControlLabel>품종</ControlLabel>
                <Typeahead
                  allowNew
                  multiple
                  newSelectionPrefix="신규 추가 : "
                  options={this.state.grapeOptions}
                  selected={this.state.grape_race}
                  onChange={items =>
                    this.setState({
                      grape_race: items.map(item => item.label ? item.label : item) })}
                />
              </FormGroup>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>설명</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.desc}
                  onChange={e => this.setState({ desc: e.target.value })}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              bsStyle="success"
              bsSize="large"
              onClick={this.originalInsert}
            >추가</Button>
            <Button
              bsSize="large"
              onClick={() => {
                this.props.close();
              }}
            >닫기</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default OriginalInsertModal;
