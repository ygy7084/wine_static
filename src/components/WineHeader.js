import React from 'react';
import {
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';

const styles = {
  dropdown: {
    borderRadius: '0px',
  },
};
const WineHeader = function WineHeader(props) {
  let title;
  switch (props.match.params.selected) {
    case 'original' :
      title = '오리지날';
      break;
    case 'vintage' :
      title = '빈티지';
      break;
    case 'sale' :
      title = '상품';
      break;
    case 'grape' :
      title = '품종 관리';
      break;
    case 'location' :
      title = '원산지 관리';
      break;
    default :
      title = '오리지날';
  }
  return (
    <div>
      <DropdownButton
        id="dropDownWine"
        style={styles.dropdown}
        bsStyle="primary"
        title={title}
        onSelect={props.modeChange}
      >
        <MenuItem active={title === '오리지날'} eventKey="오리지날">오리지날</MenuItem>
        <MenuItem active={title === '빈티지'} eventKey="빈티지">빈티지</MenuItem>
        <MenuItem active={title === '상품'} eventKey="상품">상품</MenuItem>
        <MenuItem active={title === '품종 관리'} eventKey="품종 관리">품종 관리</MenuItem>
        <MenuItem active={title === '원산지 관리'} eventKey="원산지 관리">원산지 관리</MenuItem>
      </DropdownButton>
    </div>
  );
};

export default WineHeader;
