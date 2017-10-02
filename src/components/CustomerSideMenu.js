import React from 'react';

const styles = {
  menuDiv: {
    zIndex: '1000',
    position: 'absolute',
    right: '5%',
  },
  menu: {
    color: 'black',
    cursor: 'pointer',
  },
};
class CustomerSideMenu extends React.Component{
  render() {
    return (
      <div style={styles.menuDiv}>
        <h4
          style={styles.menu}
          onClick={this.props.menuClick}
        >
          Menu
        </h4>
      </div>
    )
  }
}
export default CustomerSideMenu;
