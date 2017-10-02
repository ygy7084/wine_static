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
    storeingHours: {
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
const findModeList = [
  {
    name: '영문 줄임명',
    doc: 'sale',
    subdoc: 'vintage',
    subdoc2: 'original',
    property: 'eng_shortname',
  },
  {
    name: '한글 줄임명',
    ddoc: 'sale',
    subdoc: 'vintage',
    subdoc2: 'original',
    property: 'kor_shortname',
  },
  {
    name: '영문 풀네임',
    doc: 'sale',
    subdoc: 'vintage',
    subdoc2: 'original',
    property: 'eng_fullname',
  },
  {
    name: '한글 풀네임',
    doc: 'sale',
    subdoc: 'vintage',
    subdoc2: 'original',
    property: 'kor_fullname',
  },
  {
    name: '종류',
    doc: 'sale',
    subdoc: 'vintage',
    subdoc2: 'original',
    property: 'category',
  },
  {
    name: '원산지',
    doc: 'sale',
    subdoc: 'vintage',
    subdoc2: 'original',
    property: 'locationString',
  },
  {
    name: '품종',
    doc: 'sale',
    subdoc: 'vintage',
    subdoc2: 'original',
    property: 'grapeString',
  },
  {
    name: '빈티지',
    doc: 'sale',
    subdoc: 'vintage',
    property: 'vintage',
  },
  {
    name: '도매가',
    doc: 'sale',
    subdoc: 'vintage',
    property: 'wholeStorePrice',
  },
  {
    name: '매장명',
    doc: 'shop',
    property: 'name',
  },
  {
    name: '판매가',
    doc: 'sale',
    property: 'price',
  },
  {
    name: '최저가',
    doc: 'sale',
    property: 'lowestPrice',
  },
  {
    name: '날짜',
    property: 'datetimeString',
  },
  {
    name: '고객이름',
    doc: 'customer',
    property: 'name',
  },
  {
    name: '고객전화번호',
    doc: 'customer',
    property: 'phone',
  },
];
class StoreList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemInList: 10,
      findMode: '고객이름',
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
  componentDidMount() {
    this.findInput.focus();
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
        const regex = new RegExp(input);
        const found = [];
        const mode = findModeList.find(item => item.name === this.state.findMode);
        for (const obj of this.props.list) {
          if(mode.subdoc2 && regex.exec((((obj[mode.doc])[mode.subdoc])[mode.subdoc2])[mode.property])) {
            found.push(obj);
          } else if (mode.subdoc && regex.exec(((obj[mode.doc])[mode.subdoc])[mode.property])) {
            found.push(obj);
          } else if (mode.doc && regex.exec((obj[mode.doc])[mode.property])) {
            found.push(obj);
          } else if (regex.exec(obj[mode.property])) {
            found.push(obj);
          }
        }
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
              <Button
                bsStyle="success"
                onClick={this.props.storeInClick}
              >입고</Button>
              <Button
                bsStyle="warning"
                onClick={this.props.storeOutClick}
              >출고</Button>
              <Button
                bsStyle="primary"
                onClick={this.props.refresh}
              >새로 고침</Button>
              {
                this.props.onlyView ? null :
                  <Button
                    bsStyle="danger"
                    onClick={this.props.storeRemoveAllClick}
                  >전부 삭제</Button>
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
              inputRef={ref => this.findInput = ref}
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
                <th style={[styles.table_th.base]}>매장</th>
                <th style={[styles.table_th.base]}>고객</th>
                <th style={[styles.table_th.base]}>영문줄임명</th>
                <th style={[styles.table_th.base]}>한글줄임명</th>
                <th style={[styles.table_th.base]}>빈티지</th>
                <th style={[styles.table_th.base]}>판매가</th>
                <th style={[styles.table_th.base]}>수량변화</th>
                <th style={[styles.table_th.base]}>날짜</th>
              </tr>
            </thead>
            <tbody>
              {
                showList.map((item, i) =>
                  (
                    <tr
                      key={item._id}
                      onClick={() =>
                        this.props.storeClick(item)
                      }
                      style={styles.table_tr}
                    >
                      <td>{((this.state.activePage - 1) * this.state.itemInList) + i + 1}</td>
                      <td>{item.shop ? item.shop.name : ''}</td>
                      <td>{item.customer ? item.customer.name : ''}</td>
                      <td>{
                        item.sale ?
                          item.sale.vintage ?
                            item.sale.vintage.original ?
                              item.sale.vintage.original.eng_shortname : '' : '' :''}</td>
                      <td>{
                        item.sale ?
                          item.sale.vintage ?
                            item.sale.vintage.original ?
                              item.sale.vintage.original.kor_shortname : '' : '' :''}</td>
                      <td>{item.sale ? item.sale.vintage ? item.sale. vintage.vintage : '' : ''}</td>
                      <td>{item.sale ? item.sale.price : ''}</td>
                      <td>{item.quantityChange}</td>
                      <td>{item.datetime ? item.datetime.toLocaleDateString() : ''}</td>
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

export default Radium(StoreList);
