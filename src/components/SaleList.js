import React from 'react';
import Radium, { StyleRoot } from 'radium';
import {
  Table,
  Pagination,
  FormControl,
  DropdownButton,
  MenuItem,
  Button,
  InputGroup,
  ButtonGroup,
} from 'react-bootstrap';
import {
  listFinder,
} from '../modules';

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
      width: '15%',
    },
    name: {
      width: '15%',
    },
    saleingHours: {
      width: '15%',
    },
    datetime: {
      width: '45%',
    },
  },
  tabel_tr_td: {
    padding: '1rem',
  },
  table_tr: {
    base: {
      ':hover': {
        cursor: 'pointer',
      },
    },
    selected: {
      background: 'lightblue',
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
const findModeList = [
  {
    name: '영문 줄임명',
    key: ['vintage', 'original', 'eng_shortname'],
  },
  {
    name: '한글 줄임명',
    key: ['vintage', 'original', 'kor_shortname'],
  },
  {
    name: '영문 풀네임',
    key: ['vintage', 'original', 'eng_fullname'],
  },
  {
    name: '한글 풀네임',
    key: ['vintage', 'original', 'kor_fullname'],
  },
  {
    name: '종류',
    key: ['vintage', 'original', 'category'],
  },
  {
    name: '원산지',
    key: ['vintage', 'original', 'locationString'],
  },
  {
    name: '품종',
    key: ['vintage', 'original', 'grapeString'],
  },
  {
    name: '빈티지',
    key: ['vintage', 'vintage'],
  },
  {
    name: '도매가',
    key: ['wholeSalePrice'],
  },
  {
    name: '매장명',
    key: ['shop', 'name'],
  },
  {
    name: '판매가',
    key: ['price'],
  },
  {
    name: '최저가',
    key: ['lowestPrice'],
  },
];
class SaleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemInList: 10,
      findMode: findModeList[0].name,
      findInput: '',
      list: this.props.list,
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleFind = this.handleFind.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.list) !== JSON.stringify(nextProps.list)) {
      this.setState({
        list: nextProps.list,
        findMode: findModeList[0].name,
        findInput: '',
        activePage:
          Math.ceil(nextProps.list.length / this.state.itemInList) < this.state.activePage && this.state.activePage > 1 ?
            this.state.activePage - 1 : this.state.activePage,
      });
    }
  }
  handleSelect(value) {
    this.setState({ activePage: value });
  }
  handleFind(e) {
    const input = e.target.value;
    if (input === '') {
      this.setState({
        findInput: '',
        list: this.props.list,
        activePage: 1,
      });
    } else {
      try {
        const found =
          listFinder(
            this.props.list,
            findModeList.find(obj => obj.name === this.state.findMode).key,
            input,
          );
        this.setState({
          list: found,
          findInput: input,
          activePage: 1,
        });
      } catch (e) {
        console.log('정규식 문자는 사용할 수 없습니다.');
        console.log(e);
      }
    }
  }
  render() {
    const showList = this.state.list.slice(
      (this.state.activePage - 1) * this.state.itemInList,
      this.state.activePage * this.state.itemInList);
    return (
      <StyleRoot>
        <div>
          <div style={styles.leftButtons}>
            <ButtonGroup>
              <DropdownButton
                id="dropDownWine1"
                title={`${this.state.itemInList}개씩 보기`}
                onSelect={value => this.setState({ itemInList: value, activePage: 1 })}
              >
                <MenuItem active={this.state.itemInList === 10} eventKey={10}>10개씩 보기</MenuItem>
                <MenuItem active={this.state.itemInList === 20} eventKey={20}>20개씩 보기</MenuItem>
                <MenuItem active={this.state.itemInList === 50} eventKey={50}>50개씩 보기</MenuItem>
              </DropdownButton>
              {
                this.props.onlyView ?
                  null :
                  <Button
                    bsStyle="success"
                    onClick={this.props.saleInsertClick}
                  >상품 추가</Button>
              }
              <Button
                bsStyle="primary"
                onClick={this.props.refresh}
              >새로 고침</Button>
              {
                this.props.onlyView ?
                  null :
                  <Button
                    bsStyle="danger"
                    onClick={this.props.saleRemoveAllClick}
                  >전부 삭제</Button>
              }
              {
                this.props.fromSaleBulk ?
                  <Button
                    bsStyle="warning"
                    onClick={this.props.removeSelectedSale}
                  >선택 취소</Button>
                  : null
              }
              {
                this.props.fromSaleBulk ?
                  <Button
                    bsStyle="success"
                    onClick={this.props.completeSelectedSale}
                  >선택한 상품 수정</Button>
                  : null
              }
              {
                this.props.fromSaleBulk ?
                  <Button
                    bsStyle="danger"
                    onClick={this.props.selectRemove}
                  >선택한 상품 삭제</Button>
                  : null
              }
              {
                this.props.fromSaleBulk ?
                  this.props.selectedSale.length ?
                    <Button
                      bsStyle="info"
                      onClick={() => this.props.selectAll()}
                    >{`${this.props.selectedSale.length}개 선택 취소`}</Button>
                    :
                    <Button
                      bsStyle="info"
                      onClick={() => this.props.selectAll('sale')}
                    >전부 선택</Button>
                  : null
              }
            </ButtonGroup>
          </div>
          <InputGroupRadium style={styles.rightButtons}>
            <DropdownButton
              id="dropDownWine2"
              componentClass={InputGroup.Button}
              onSelect={value => this.setState({
                findMode: value,
                findInput: '',
                list: this.props.list,
                activePage: 1,
              })}
              title={this.state.findMode}
            >
              {
                findModeList.map(findMode => (
                  <MenuItem
                    key={findMode.name}
                    active={this.state.findMode === findMode.name}
                    eventKey={findMode.name}
                  >
                    {findMode.name}
                  </MenuItem>
                ))
              }
            </DropdownButton>
            <FormControl
              type="text"
              value={this.state.findInput}
              onChange={this.handleFind}
            />
          </InputGroupRadium>
          <Table
            style={styles.table}
            striped
            bordered
            hover
          >
            <thead>
              <tr>
                <th style={[styles.table_th.base]}>번호</th>
                <th style={[styles.table_th.base]}>영문 줄임명</th>
                <th style={[styles.table_th.base]}>한글 줄임명</th>
                <th style={[styles.table_th.base]}>종류</th>
                <th style={[styles.table_th.base]}>빈티지</th>
                <th style={[styles.table_th.base]}>매장명</th>
                <th style={[styles.table_th.base]}>도매가</th>
                <th style={[styles.table_th.base]}>최저가</th>
                <th style={[styles.table_th.base]}>판매가</th>
                { this.props.fromSaleBulk ?
                  <th style={[styles.table_th.base]}>상세</th> :
                  null
                }
              </tr>
            </thead>
            <tbody>
              {
                showList.map((item, i) =>
                  (
                    <tr
                      key={item._id}
                      onClick={this.props.fromSaleBulk ? null :
                        () => this.props.saleClick(item)
                      }
                      style={[styles.table_tr.base,
                        this.props.fromSaleBulk &&
                        this.props.selectedSale.find(obj => obj._id === item._id) ?
                          styles.table_tr.selected : null
                      ]}
                    >
                      <td
                        onClick={this.props.fromSaleBulk ?
                          () => this.props.selectSale(item) : null}
                      >
                        {((this.state.activePage - 1) * this.state.itemInList) + i + 1}</td>
                      <td
                        onClick={this.props.fromSaleBulk ?
                          () => this.props.selectSale(item) : null}
                      >
                        {
                          item.vintage ?
                            item.vintage.original ?
                              item.vintage.original.eng_shortname : '' : ''}</td>
                      <td
                        onClick={this.props.fromSaleBulk ?
                          () => this.props.selectSale(item) : null}
                      >
                        {
                          item.vintage ?
                            item.vintage.original ?
                              item.vintage.original.kor_shortname : '' : ''}</td>
                      <td
                        onClick={this.props.fromSaleBulk ?
                          () => this.props.selectSale(item) : null}
                      >
                        {
                          item.vintage ?
                            item.vintage.original ?
                              item.vintage.original.category : '' : ''}</td>
                      <td
                        onClick={this.props.fromSaleBulk ?
                          () => this.props.selectSale(item) : null}
                      >
                        {item.vintage ? item.vintage.vintage : ''}</td>
                      <td
                        onClick={this.props.fromSaleBulk ?
                          () => this.props.selectSale(item) : null}
                      >
                        {item.shop ? item.shop.name : ''}</td>
                      <td
                        onClick={this.props.fromSaleBulk ?
                          () => this.props.selectSale(item) : null}
                      >
                        {item.wholeSalePrice}</td>
                      <td
                        onClick={this.props.fromSaleBulk ?
                          () => this.props.selectSale(item) : null}
                      >
                        {item.lowestPrice}</td>
                      <td
                        onClick={this.props.fromSaleBulk ?
                          () => this.props.selectSale(item) : null}
                      >
                        {item.price}</td>
                      { this.props.fromSaleBulk ?
                        <td
                          style={{ background: 'antiquewhite' }}
                          onClick={() => this.props.showSaleDetail(item)}
                        >상세</td> :
                        null
                      }
                    </tr>
                  ))
              }
            </tbody>
          </Table>
          <div style={styles.pagination}>
            <Pagination
              bsSize="medium"
              items={Math.ceil(this.state.list.length / this.state.itemInList)}
              maxButtons={10}
              activePage={this.state.activePage}
              onSelect={this.handleSelect}
              prev
              next
              first
              last
            />
          </div>
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(SaleList);
