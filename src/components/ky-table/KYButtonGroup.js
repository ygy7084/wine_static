/* global window */
import React from 'react';
import Radium, { StyleRoot } from 'radium';
import {
  ButtonGroup, Button,
} from 'react-bootstrap';

const ButtonGroupRadium = Radium(ButtonGroup);
const ButtonRadium = Radium(Button);
const styles = {
  buttonGroup: {
    base: {
      float: 'left',
    },
    open: {
      '@media screen and (max-width: 650px)': {
        display: 'grid',
        float: 'none',
        width: '100%',
      },
    },
    close: {
      '@media screen and (max-width: 650px)': {
        display: 'none',
        float: 'none',
        width: '100%',
      },
    },
  },
  menu: {
    display: 'none',
    width: '100%',
    borderRadius: '0px',
    '@media screen and (max-width: 650px)': {
      display: 'grid',
    },
  },
};
class KYButtonGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toggle: false };
  }
  render() {
    return (
      <StyleRoot>
        <ButtonRadium
          style={styles.menu}
          bsStyle="info"
          onClick={() => this.setState({ toggle: !this.state.toggle })}
        >메뉴</ButtonRadium>
        <ButtonGroupRadium style={[
          styles.buttonGroup.base, this.state.toggle ?
            styles.buttonGroup.open : styles.buttonGroup.close]}
        >
          {this.props.children}
        </ButtonGroupRadium>
      </StyleRoot>
    );
  }
}
export default Radium(KYButtonGroup);
