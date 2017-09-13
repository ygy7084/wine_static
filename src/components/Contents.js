import React from 'react';
import Radium from 'radium';

const style = {
  Contents: {
    base: {
      paddingLeft: '220px',
      paddingRight: '20px',
      paddingTop: '75px',
    },
    wide: {
      paddingLeft: '20px',
    },
  },
};
const Contents = (props) => {
  console.log(props.menuClose);
  const contentsStyle = [style.Contents.base];
  if (props.menuClose) {
    contentsStyle.push(style.Contents.wide);
  }
  return (
    <div style={contentsStyle}>
      {props.children}
    </div>
  );
};

export default Radium(Contents);
