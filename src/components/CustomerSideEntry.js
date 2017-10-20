import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import './Entry.css';
import errorHandler from "../modules/errorHandler";

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

class CustomerSideEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: '',
      passwordInput: '',
      passwordInputCheck: '',
      emailInput: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.loginRequest = this.loginRequest.bind(this);
  }
  handleInputChange(input, e) {
    switch (input) {
      case 'username':
        this.setState({ usernameInput: e.target.value });
        break;
      case 'password':
        this.setState({ passwordInput: e.target.value });
        break;
      case 'passwordCheck':
        this.setState({ passwordInputCheck: e.target.value });
        break;
      case 'email':
        this.setState({ emailInput: e.target.value });
        break;
      default:
        break;
    }
  }
  loginRequest() {
    if (this.props.preLoginStatus !== 'SUCCESS') {
      this.props.preLoginRequest(this.state.usernameInput);
    } else {
      if (this.props.initialLogin) {
        if (this.state.passwordInput !== this.state.passwordInputCheck) {
          errorHandler({ message: '패스워드 입력이 같지 않습니다.' });
        } else if (this.state.passwordInput.length !== 4) {
          errorHandler({ message: '패스워드가 4자리가 아닙니다.'})
        } else if (this.state.passwordInput.replace(/\D/g, '').length !== 4){
          errorHandler({ message: '패스워드에 문자가 포함되어 있습니다.'})
        }
        else {
          this.props.initialLoginRequest({
            password: this.state.passwordInput,
            email: this.state.emailInput.trim(),
          });
        }
      } else {
        this.props.loginRequest({
          username: this.state.usernameInput,
          password: this.state.passwordInput,
        });
      }
    }
  }
  render() {
    return (
      <div>
        <div className="container" style={styles.horizontal_center}>
          <div className="wine" style={styles.wine} />
          <Form onSubmit={(e) => { e.preventDefault(); this.loginRequest(); }}>
            <FormGroup>
              <ControlLabel>전화번호</ControlLabel>
              <FormControl
                type="text"
                value={this.state.usernameInput}
                style={styles.form}
                onChange={e => this.handleInputChange('username', e)}
                disabled={this.props.preLoginStatus === 'SUCCESS'}
              />
              {
                this.props.preLoginStatus === 'SUCCESS' ?
                  <div>
                    {
                      this.props.initialLogin ?
                        <p>차후 사용할 비밀번호를 *숫자 4자리로 입력해주십시요.</p> : null
                    }
                    <ControlLabel style={styles.formLabel}>비밀번호</ControlLabel>
                    <FormControl
                      type="password"
                      value={this.state.passwordInput}
                      style={styles.form}
                      onChange={e => this.handleInputChange('password', e)}
                    />
                    {
                      this.props.initialLogin ?
                        <div>
                          <ControlLabel style={styles.formLabel}>비밀번호 확인</ControlLabel>
                          <FormControl
                            type="password"
                            value={this.state.passwordInputCheck}
                            style={styles.form}
                            onChange={e => this.handleInputChange('passwordCheck', e)}
                          />
                          <ControlLabel style={styles.formLabel}>이메일</ControlLabel>
                          <p>비밀번호 찾기에 이용할 이메일을 입력해주십시요.</p>
                          <FormControl
                            type="email"
                            value={this.state.emailInput}
                            style={styles.form}
                            onChange={e => this.handleInputChange('email', e)}
                          />
                        </div> : null
                    }
                  </div> :
                  <div>

                  </div>
              }
            </FormGroup>
            <Button type="submit" style={styles.button} block>
            접속
            </Button>
            {
              this.props.preLoginStatus === 'SUCCESS' && !this.props.initialLogin ?
                <Button style={styles.button} block onClick={() => this.props.findPassword(this.state.usernameInput)}>
                  비밀번호 찾기
                </Button> : null
            }
          </Form>
          <hr />
          <b>문의</b>
          <p>mlee@lafite.co.kr</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(CustomerSideEntry);
