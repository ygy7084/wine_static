import React from 'react';
import Radium, { StyleRoot } from 'radium';
import {
  Table,
  Pagination,
  FormControl,
  DropdownButton,
  MenuItem,
  Button,
  ButtonGroup,
  InputGroup,
} from 'react-bootstrap';

const InputGroupRadium = Radium(InputGroup);

const findModeList = [
  {
    name: 'ID',
    property: 'name',
  },
  {
    name: '이름',
    property: 'phone',
  },
  {
    name: '권한',
    property: 'email',
  },
  {
    name: '매장',
    property: 'address',
  },
];
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
    id: {
      width: '25%',
    },
    name: {
      width: '25%',
    },
    level: {
      width: '20%',
    },
    shop: {
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
class AccountList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemInList: 10,
      findMode: 'ID',
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
        findMode: 'ID',
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
    let input = e.target.value;
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
        let property;
        let doc;
        switch (this.state.findMode) {
          case 'ID':
            property = 'username';
            break;
          case '이름':
            property = 'name';
            break;
          case '권한':
            property = 'level';
            break;
          case '매장':
            doc = 'shop';
            property = 'name';
            break;
          default:
        }
        for (const obj of this.props.list) {
          if (doc && regex.exec((obj[doc])[property])) {
            found.push(obj);
          } else if (regex.exec(property)) {
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
                id="dropDownAccount1"
                title={`${this.state.itemInList}개씩 보기`}
                onSelect={value => this.setState({ itemInList: value, activePage: 1 })}
              >
                <MenuItem active={this.state.itemInList === 10} eventKey={10}>10개씩 보기</MenuItem>
                <MenuItem active={this.state.itemInList === 20} eventKey={20}>20개씩 보기</MenuItem>
                <MenuItem active={this.state.itemInList === 50} eventKey={50}>50개씩 보기</MenuItem>
              </DropdownButton>
              <Button
                bsStyle="success"
                onClick={this.props.accountInsertClick}
              >계정 추가</Button>
              <Button
                bsStyle="primary"
                onClick={this.props.refresh}
              >새로 고침</Button>
              <Button
                bsStyle="danger"
                onClick={this.props.accountRemoveAllClick}
              >전부 삭제</Button>
            </ButtonGroup>
          </div>
          <InputGroupRadium style={styles.rightButtons}>
            <DropdownButton
              id="dropDownAccount2"
              componentClass={InputGroup.Button}
              onSelect={value => this.setState({
                findMode: value,
                findInput: '',
                list: this.props.list,
                activePage: 1,
              })}
              title={this.state.findMode}
            >
              <MenuItem active={this.state.findMode === 'ID'} eventKey="ID">ID</MenuItem>
              <MenuItem active={this.state.findMode === '이름'} eventKey="이름">이름</MenuItem>
              <MenuItem active={this.state.findMode === '권한'} eventKey="권한">권한</MenuItem>
              <MenuItem active={this.state.findMode === '매장'} eventKey="매장">매장</MenuItem>
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
                <th style={[styles.table_th.base, styles.table_th.number]}>번호</th>
                <th style={[styles.table_th.base, styles.table_th.id]}>ID</th>
                <th style={[styles.table_th.base, styles.table_th.name]}>이름</th>
                <th style={[styles.table_th.base, styles.table_th.level]}>권한</th>
                <th style={[styles.table_th.base, styles.table_th.shop]}>매장</th>
              </tr>
            </thead>
            <tbody>
              {
                showList.map((item, i) =>
                  (
                    <tr
                      key={item._id}
                      onClick={() =>
                        this.props.accountClick(item)
                      }
                      style={styles.table_tr}
                    >
                      <td>{((this.state.activePage - 1) * this.state.itemInList) + i + 1}</td>
                      <td>{item.username}</td>
                      <td>{item.name}</td>
                      <td>{item.level}</td>
                      <td>{item.shop ? item.shop.name : ''}</td>
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

export default Radium(AccountList);
