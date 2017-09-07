import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

class RadiumButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button key="keyForButton" style={[styles.button]}>Hover ME</button>
        {Radium.getState(this.state, 'keyForButton', ':hover') ? (
          <span>{' '}Hovering!</span>
        ) : null}
      </div>
    );
  }
}

// You can create your style objects dynamically or share them for
// every instance of the component.
const styles = {
  button: {
    ':hover': { color: 'red' },
  },

};

export default Radium(RadiumButton);
