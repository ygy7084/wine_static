import React from 'react';
import Radium from 'radium';
import {
  Table,
  Pagination,
  FormGroup,
  FormControl,
  DropdownButton,
  MenuItem,
  ButtonToolbar,
  Button,
  InputGroup
} from 'react-bootstrap';

class WineList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      findInput: '',
      list: [],
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleFind = this.handleFind.bind(this);
  }

  componentWillReceiveProps(next) {
    this.setState({
      list: next.list,
    });
  }

  handleSelect(value) {
    this.setState({ activePage: value });
  }
  handleFind(e) {
  }
  render() {
    return (
      <div>
        <div style={styles.leftButtons} >
          <ButtonToolbar>
            <DropdownButton title="10개씩 보기" >
              <MenuItem active>10개씩 보기</MenuItem>
              <MenuItem>20개씩 보기</MenuItem>
              <MenuItem>50개씩 보기</MenuItem>
            </DropdownButton>
            <DropdownButton title="오리지날" >
              <MenuItem active>오리지날</MenuItem>
              <MenuItem>빈티지</MenuItem>
              <MenuItem>상품</MenuItem>
            </DropdownButton>
            <Button bsStyle="success">와인 추가</Button>
          </ButtonToolbar>
        </div>
        <div style={styles.rightButtons} >
          <form>
            <FormGroup>
              <InputGroup>
                <DropdownButton
                  componentClass={InputGroup.Button}
                  title="영문 줄임명"
                >
                  <MenuItem active>영문 줄임명</MenuItem>
                  <MenuItem>한글 줄임명</MenuItem>
                  <MenuItem>영문 풀네임</MenuItem>
                </DropdownButton>
                <FormControl type="text" />
                <InputGroup.Button>
                  <Button bsStyle="primary">검색</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </form>
        </div>

        <Table
          style={styles.table}
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th style={styles.table_th}>번호</th>
              <th style={styles.table_th}>영문 줄임명</th>
              <th style={styles.table_th}>한글 줄임명</th>
              <th style={styles.table_th}>종류</th>
              <th style={styles.table_th}>국가</th>
              <th style={styles.table_th}>지역</th>
              <th style={styles.table_th}>세부지역</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>English</td>
              <td>Korean</td>
              <td>TEST</td>
              <td>TEST</td>
              <td>TEST</td>
              <td>TEST</td>
            </tr>
          </tbody>
        </Table>
        <div style={styles.pagination}>
          <Pagination
            bsSize="medium"
            items="1"
            activePage={this.state.activePage}
            onSelect={this.handleSelect}
            prev
            next
          />
        </div>
      </div>
    );
  }
}
const styles = {
  table: {
    margin: 'auto',
    textAlign: 'center',
    fontSize: '1.5rem',
  },
  table_th: {
    textAlign: 'center',

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
    float: 'left',
  },
  rightButtons: {
    width: '300px',
    float: 'right',
  },
};

export default Radium(WineList);
