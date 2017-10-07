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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'react-bootstrap';

const InputGroupRadium = Radium(InputGroup);
const styles = {
  header: {
    textAlign: 'center',
  },
  table: {
    margin: 'auto',
    textAlign: 'center',
    fontSize: '1.5rem',
  },
  table_th: {
    base: {
      textAlign: 'center',
    },
    price: {
      width: '15%',
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
    vintageingHours: {
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
      border: 'solid',
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
    doc: 'original',
    property: 'eng_shortname',
  },
  {
    name: '한글 줄임명',
    doc: 'original',
    property: 'kor_shortname',
  },
  {
    name: '영문 풀네임',
    doc: 'original',
    property: 'eng_fullname',
  },
  {
    name: '한글 풀네임',
    doc: 'original',
    property: 'kor_fullname',
  },
  {
    name: '종류',
    doc: 'original',
    property: 'category',
  },
  {
    name: '원산지',
    doc: 'original',
    property: 'locationString',
  },
  {
    name: '품종',
    doc: 'original',
    property: 'grapeString',
  },
  {
    name: '빈티지',
    property: 'vintage',
  }
];
class SaleListForSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemInList: 10,
      findMode: findModeList[0].name,
      findInput: '',
      list: this.props.list,
    };
    this.handleFind = this.handleFind.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.modifySale = this.modifySale.bind(this);
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
          if (mode.doc && regex.exec((obj[mode.doc])[mode.property])) {
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
  inputChange(item, value, key) {
    const list = this.state.list.slice();
    list.find(obj => obj._id === item._id)[key] = value;
    this.setState({ list });
  }
  modifySale() {
    const list = this.state.list.slice();
    const input = [];
    for (const obj of list) {
      input.push({
        _id: obj._id,
        price: obj.price,
        lowestPrice: obj.lowestPrice,
        wholeSalePrice: obj.wholeSalePrice,
      });
    }
    this.props.modifySale(input);
  }
  render() {
    const showList = this.state.list.slice(
      (this.state.activePage - 1) * this.state.itemInList,
      this.state.activePage * this.state.itemInList);
    return (
      <StyleRoot>
        <div>
          <Modal
            show
            bsSize="large"
            animation={false}
          >
            <ModalHeader style={styles.header}>
              <h1>상품 수정</h1>
              <h4>상품 정보를 입력하십시요.</h4>
            </ModalHeader>
            <ModalBody>
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
                      <th style={[styles.table_th.base, styles.table_th.price]}>도매가</th>
                      <th style={[styles.table_th.base, styles.table_th.price]}>최소가</th>
                      <th style={[styles.table_th.base, styles.table_th.price]}>판매가</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      showList.map((item, i) =>
                        (
                          <tr
                            key={item._id}
                            style={[styles.table_tr.base]}
                          >
                            <td>
                              {((this.state.activePage - 1) * this.state.itemInList) + i + 1}</td>
                            <td>
                              {item.vintage ?
                                item.vintage.original ?
                                  item.vintage.original.eng_shortname : '' : ''}</td>
                            <td>
                              {item.vintage ?
                                item.vintage.original ?
                                  item.vintage.original.kor_shortname : '' : ''}</td>
                            <td>
                              {item.vintage ?
                                item.vintage.original ?
                                  item.vintage.original.category : '' : ''}</td>
                            <td>{item.vintage ? item.vintage.vintage : ''}</td>
                            <td>
                              {
                                <FormControl
                                  type="number"
                                  value={item.wholeSalePrice ? item.wholeSalePrice : 0}
                                  onChange={e => this.inputChange(item, e.target.value, 'wholeSalePrice')}
                                />
                              }
                            </td>
                            <td>
                              {
                                <FormControl
                                  type="number"
                                  value={item.lowestPrice ? item.lowestPrice : 0}
                                  onChange={e => this.inputChange(item, e.target.value, 'lowestPrice')}
                                />
                              }
                            </td>
                            <td>
                              {
                                <FormControl
                                  type="number"
                                  value={item.price ? item.price : 0}
                                  onChange={e => this.inputChange(item, e.target.value, 'price')}
                                />
                              }
                            </td>
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
            </ModalBody>
            <ModalFooter>
              <Button
                bsSize="large"
                bsStyle="success"
                onClick={this.modifySale}
              >수정</Button>
              <Button
                bsSize="large"
                onClick={this.props.close}
              >닫기</Button>
            </ModalFooter>
          </Modal>
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(SaleListForSale);
