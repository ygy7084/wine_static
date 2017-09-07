import React from 'react';
import Radium from 'radium';

class PhoneInput extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.inputNumber}</h1>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td key="1" style={styles.table_td} onClick={() => { this.props.buttonClick(1); }}>
                <p style={styles.table_td_p}>1</p>
              </td>
              <td key="2" style={styles.table_td} onClick={() => { this.props.buttonClick(2); }}>
                <p style={styles.table_td_p}>2</p>
              </td>
              <td key="3" style={styles.table_td} onClick={() => { this.props.buttonClick(3); }}>
                <p style={styles.table_td_p}>3</p>
              </td>
            </tr>
            <tr>
              <td key="4" style={styles.table_td} onClick={() => { this.props.buttonClick(4); }}>
                <p style={styles.table_td_p}>4</p>
              </td>
              <td key="5" style={styles.table_td} onClick={() => { this.props.buttonClick(5); }}>
                <p style={styles.table_td_p}>5</p>
              </td>
              <td key="6" style={styles.table_td} onClick={() => { this.props.buttonClick(6); }}>
                <p style={styles.table_td_p}>6</p>
              </td>
            </tr>
            <tr>
              <td key="7" style={styles.table_td} onClick={() => { this.props.buttonClick(7); }}>
                <p style={styles.table_td_p}>7</p>
              </td>
              <td key="8" style={styles.table_td} onClick={() => { this.props.buttonClick(8); }}>
                <p style={styles.table_td_p}>8</p>
              </td>
              <td key="9" style={styles.table_td} onClick={() => { this.props.buttonClick(9); }}>
                <p style={styles.table_td_p}>9</p>
              </td>
            </tr>
            <tr>
              <td />
              <td key="0" style={styles.table_td} onClick={() => { this.props.buttonClick(0); }}>
                <a style={styles.table_td_p}>0</a>
              </td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const styles = {
  table: {
    margin: 'auto',
    textAlign: 'center',
    fontSize: '4rem',
  },
  table_td: {
    padding: '20px',

    ':hover': {
      cursor: 'pointer',
    },
  },
  table_td_p: {
    textDecoration: 'none',
    color: 'black',
  },
};

export default Radium(PhoneInput);
