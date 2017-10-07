import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const styles = {
  button: {
    borderRadius: '0px',
  },
};
export default function KYButton(props) {
  return (
    <Button
      style={styles.button}
      bsStyle={props.bsStyle}
      onClick={props.onClick}
      block={props.block}
    >
      {props.value || props.children}
    </Button>
  );
}
KYButton.propTypes = {
  bsStyle: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.string,
  block: PropTypes.bool,
};
KYButton.defaultProps = {
  bsStyle: undefined,
  onClick: undefined,
  value: '',
  block: false,
};
