import React from 'react';
import Radium from 'radium';

class PointButtons extends React.Component {
  render() {
    return (
      <div>
        <a key="b1" style={styles.buttons} onClick={this.props.pointSave}>적립하기</a>
        <a key="b2" style={styles.buttons} onClick={this.props.inputNumberReset}>지우기</a>
      </div>
    );
  }
}

const styles = {
  buttons: {
    textDecoration: 'none',
    color: 'black',
    width: '100px',
    textAlign: 'center',
    fontSize: '3rem',
    margin: '10px',
    ':hover': {
      cursor: 'pointer',
    },
  },
};

export default Radium(PointButtons);
