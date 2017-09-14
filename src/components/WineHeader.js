import React from 'react';
import Radium, { StyleRoot } from 'radium';
import {
  FormControl,
  DropdownButton,
  MenuItem,
  ButtonGroup,
  InputGroup,
  Button,
} from 'react-bootstrap';

const InputGroupRadium = Radium(InputGroup);

const styles = {
  table: {
    margin: 'auto',
    textAlign: 'center',
    fontSize: '1.5rem',
  },
  table_th: {
    base: {
      textAlign: 'center',
    },
    number: {
      width: '10%',
    },
    sn: {
      width: '35%',
    },
    name: {
      width: '35%',
    },
    level: {
      width: '20%',
    },
  },
  tabel_tr_td: {
    padding: '1rem',
  },
  table_tr: {
    ':hover': {
      cursor: 'pointer',
    },
  },
  findForm: {
    width: '150px',
  },
  pagination: {
    textAlign: 'center',
  },
  leftButtons: {
    display: 'inline-flex',
  },
  rightButtons: {
    width: '200px',
    float: 'right',
    '@media screen and (max-width: 700px)': {
      width: '100%',
    },
  },
};

class WineHeader extends React.Component {
  render() {
    let extraButton;
    switch (this.props.listMode) {
      case '오리지날':
        extraButton = (
          <Button
            bsStyle="success"
            onClick={this.props.originalInsertClick}
          >오리지날 추가</Button>
        ); break;
      case '빈티지':
        extraButton = (
          <Button
            bsStyle="success"
            onClick={this.props.vintageInsertClick}
          >빈티지 추가</Button>
        ); break;
      case '상품':
        extraButton = (
          <Button
            bsStyle="success"
            onClick={this.props.saleInsertClick}
          >상품 추가</Button>
        ); break;
      default :
    }
    return (
      <StyleRoot>
        <div style={styles.leftButtons} >
          <ButtonGroup>
            <DropdownButton
              id="dropDownWine1"
              title={`${this.props.itemInList}개씩 보기`}
              onSelect={this.props.handleItemInListChange}
            >
              <MenuItem active={this.props.itemInList === 10} eventKey={10}>10개씩 보기</MenuItem>
              <MenuItem active={this.props.itemInList === 20} eventKey={20}>20개씩 보기</MenuItem>
              <MenuItem active={this.props.itemInList === 50} eventKey={50}>50개씩 보기</MenuItem>
            </DropdownButton>
            <DropdownButton
              id="dropDownWine2"
              bsStyle="primary"
              title={this.props.listMode}
              onSelect={this.props.handleListModeChange}
            >
              <MenuItem active={this.props.listMode === '오리지날'} eventKey="오리지날">오리지날</MenuItem>
              <MenuItem active={this.props.listMode === '빈티지'} eventKey="빈티지">빈티지</MenuItem>
              <MenuItem active={this.props.listMode === '상품'} eventKey="상품">상품</MenuItem>
            </DropdownButton>
            { extraButton }
          </ButtonGroup>
        </div>
        <InputGroupRadium style={styles.rightButtons}>
          <DropdownButton
            id="dropDownWine3"
            componentClass={InputGroup.Button}
            onSelect={this.props.handleFindModeChange}
            title={this.props.findMode}
          >
            <MenuItem active={this.props.findMode === '영문 풀네임'} eventKey="영문 풀네임">영문 풀네임</MenuItem>
            <MenuItem active={this.props.findMode === '영문 줄임명'} eventKey="영문 줄임명">영문 줄임명</MenuItem>
            <MenuItem active={this.props.findMode === '한글 풀네임'} eventKey="한글 풀네임">한글 풀네임</MenuItem>
            <MenuItem active={this.props.findMode === '한글 줄임명'} eventKey="한글 줄임명">한글 줄임명</MenuItem>
          </DropdownButton>
          <FormControl
            type="text"
            value={this.props.findInput}
            onChange={this.props.handleFindInputChange}
          />
        </InputGroupRadium>
      </StyleRoot>
    );
  }
}

export default Radium(WineHeader);
