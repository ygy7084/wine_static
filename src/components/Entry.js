import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import {
  Link,
} from 'react-router-dom';
import {
  turnOnSimpleMessage,
  SimpleMessage,
} from './';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { push } from 'react-router-redux'

import './Entry.css';

const styles = {
  wine: {
    marginTop: '20px',
    marginBottom: '130px',
  },
  horizontal_center: {
    margin: '0 auto',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  form: {
    textAlign: 'center',
    fontSize: '2rem',
  },
  formLabel: {
    marginTop: '10px',
  },
  button: {
    background: 'rgb(38, 50, 56)',
    color: 'white',
  },
};

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idInput: '',
      passwordInput: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleInputChange(input, e) {
    switch (input) {
      case 'id':
        this.setState({ idInput: e.target.value });
        break;
      case 'password':
        this.setState({ passwordInput: e.target.value });
        break;
      default:
        break;
    }
  }
  handleLogin() {
    // test
    if (
      this.state.idInput === '' &&
      this.state.passwordInput === ''
    ) {
      turnOnSimpleMessage.error('올바른 아이디와 비밀번호를 입력하십시요.');
    } else {
      return this.props.changePage();
    }
  }
  render() {
    return (
      <div>
        <div className="container" style={styles.horizontal_center}>
          <div className="wine" style={styles.wine} />
          <Form>
            <FormGroup controlId="formControlsText">
              <ControlLabel>ID</ControlLabel>
              <FormControl
                type="text"
                value={this.state.idInput}
                style={styles.form}
                onChange={e => this.handleInputChange('id', e)}
              />
              <ControlLabel style={styles.formLabel}>Password</ControlLabel>
              <FormControl
                type="password"
                value={this.state.passwordInput}
                style={styles.form}
                onChange={e => this.handleInputChange('password', e)}
              />
            </FormGroup>
          </Form>
          <Button style={styles.button} onClick={this.handleLogin} block>
            접속
          </Button>
          <hr />
          <b>문의</b>
          <p>abcde@gmail.com</p>
        </div>
        <SimpleMessage />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/main')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Entry)
