import React from 'react';

class PointWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={style.wrapper}>
        {this.props.children}
      </div>
    );
  }
}

const style = {
  wrapper: {
    width: '100%',
    marginTop: '100px',
    textAlign: 'center',
  },
};

export default PointWrapper;
