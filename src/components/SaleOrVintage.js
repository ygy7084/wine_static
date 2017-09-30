import React from 'react';
import {
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';

const styles = {
  buttons: {
    marginBottom: '1rem',
  },
};
const SaleOrVintage = function SaleOrVintage(props) {
  return (
    <div style={styles.buttons}>
      <ButtonToolbar>
        <ToggleButtonGroup
          type="radio"
          name="options"
          defaultValue="상품 리스트"
          value={props.mode}
          onChange={props.modeChange}
        >
          <ToggleButton bsStyle={props.mode === '상품 리스트' ? 'primary' : 'default'} value="상품 리스트">
            상품 리스트
          </ToggleButton>
          <ToggleButton bsStyle={props.mode === '상품 수정' ? 'primary' : 'default'} value="상품 수정">
            상품 수정
          </ToggleButton>
          <ToggleButton bsStyle={props.mode === '상품 생성' ? 'primary' : 'default'} value="상품 생성">
            상품 생성
          </ToggleButton>
        </ToggleButtonGroup>
      </ButtonToolbar>
      {
        props.mode === '상품 생성' ?
          <h3>상품을 추가할 빈티지를 선택하십시요.</h3> : null
      }
      {
        props.mode === '상품 수정' ?
          <h3>수정할 상품을 선택하십시요.</h3> : null
      }
    </div>
  );
};

export default SaleOrVintage;
