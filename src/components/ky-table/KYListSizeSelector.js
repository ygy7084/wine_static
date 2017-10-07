import React from 'react';
import PropTypes from 'prop-types';
import {
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';

const styles = {
  dropDown: {
    borderRadius: '0px',
    width: '100%',
  },
  item: {
    width: '100%',
  },
};
export default function KYListSizeSelector(props) {
  return (
    <DropdownButton
      id={'KYLISTSIZESELECTOR'}
      title={`${props.value}개씩 보기`}
      onSelect={props.onClick}
      style={styles.dropDown}
    >
      {
        props.numbers.map(number => (
          <MenuItem
            key={number}
            eventKey={number}
            active={number === props.value}
            style={styles.item}
          >
            {`${number}개씩 보기`}
          </MenuItem>
        ))
      }
    </DropdownButton>
  );
}
KYListSizeSelector.propTypes = {
  value: PropTypes.number,
  numbers: PropTypes.arrayOf(PropTypes.number),
  onClick: PropTypes.func.isRequired,
};
KYListSizeSelector.defaultProps = {
  value: 10,
  numbers: [10],
};
