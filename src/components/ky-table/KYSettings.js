import React from 'react';
import Radium, {StyleRoot} from 'radium';
import PropTypes from 'prop-types';
import {
  DropdownButton,
  MenuItem,
  Button,
  InputGroup,
} from 'react-bootstrap';

const InputGroupRadium = Radium(InputGroup);
const MenuItemRadium = Radium(MenuItem);
const styles = {
  group: {
    width: '200px',
    float: 'right',
    '@media screen and (max-width: 650px)': {
      float: 'none',
      width: '100%',
    },
  },
  menu: {
    width: '200px',
    textAlign: 'center',
    '@media screen and (max-width: 650px)': {
      width: '100%',
    },
  },
  button: {
    width: '100%',
  },
};
export default class KYSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      input: '',
    };
    this.onToggle = this.onToggle.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onToggle() {
    this.setState({ toggle: !this.state.toggle });
  }
  onInputChange(e) {
    this.setState({ input: e.target.value });
  }
  onFilterChange(e) {
    this.setState({ filter: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <StyleRoot>
        <InputGroupRadium style={styles.group}>
          <DropdownButton
            id={'dropdownSetting'}
            style={styles.button}
            componentClass={InputGroup.Button}
            open={this.state.toggle}
            onToggle={(t, e, s) =>
              s.source !== 'select' ?
                this.setState({
                  toggle: !this.state.toggle,
                }) : null
            }
            title="설정"
          >
            <MenuItemRadium style={styles.menu}>
              <Button style={styles.button}>버튼1</Button>
            </MenuItemRadium>
            <MenuItemRadium style={styles.menu}>
              <Button style={styles.button}>버튼1</Button>
            </MenuItemRadium>
          </DropdownButton>
        </InputGroupRadium>
      </StyleRoot>
    );
  }
}

