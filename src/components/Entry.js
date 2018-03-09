import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

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
    fontSize: '1.5rem',
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
      usernameInput: '',
      passwordInput: '',
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
      default:
        break;
    }
  }
  loginRequest() {
    this.props.loginRequest({
      username: this.state.usernameInput,
      password: this.state.passwordInput,
    });
  }
  render() {
    return (
      <div>
        <div className="container" style={styles.horizontal_center}>
          <div className="wine" style={styles.wine} />
          <Form onSubmit={(e) => { e.preventDefault(); this.loginRequest(); }}>
            <FormGroup>
              <Label>ID</Label>
              <Input
                value={this.state.usernameInput}
                style={styles.form}
                onChange={e => this.handleInputChange('username', e)}
              />
              <Label style={styles.formLabel}>Password</Label>
              <Input
                type="password"
                value={this.state.passwordInput}
                style={styles.form}
                onChange={e => this.handleInputChange('password', e)}
              />
            </FormGroup>
            <Button type="submit" style={styles.button} block>
              접속
            </Button>
          </Form>
          <hr />
          <b>문의</b>
          <p>mlee@lafite.co.kr</p>
          <a href="/">고객 접속 페이지</a>
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
)(Entry);
