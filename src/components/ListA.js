import React from 'react';
import update from 'react-addons-update';
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
import {
  listFinder,
  objectKeyFollower,
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
    input: {
      padding: 0,
      textAlign: 'center',
      verticalAlign: 'middle',
    },
    textInput: {
      width: '100%',
      textAlign: 'center',
      borderRadius: '0px',
    },
    inputBtn: {
      fontDecoration: 'none',
      cursor: 'pointer',
    },
  },
  table_tr: {
    ':hover': {
      cursor: 'pointer',
    },
  },
  pagination: {
    textAlign: 'center',
  },
  leftButtons: {
    display: 'inline-flex',
  },
  rightButtons: {
    group: {
      width: '200px',
      float: 'right',
      '@media screen and (max-width: 700px)': {
        float: 'initial',
      },
    },
    dropdownButton: {
      width: '100%',
    },
    dropDownMenu: {
      width: '200px',
      textAlign: 'center',
    },
  },
  button: {
    borderRadius: '0px',
  },
};
class ListA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemInList: 10,
      input: {},
      option: {
        toggle: false,
        filter: false,
        erase: false,
      },
    };
    this.props.structure.forEach((obj) => {
      this.state.input[obj.stateKey] = '';
    });
    this.handleSelect = this.handleSelect.bind(this);
    this.insert = this.insert.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOptions = this.handleOptions.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.list) !== JSON.stringify(nextProps.list)) {
      this.setState({
        list: nextProps.list,
        activePage:
          Math.ceil(nextProps.list.length / this.state.itemInList) < this.state.activePage && this.state.activePage > 1 ?
            this.state.activePage - 1 : this.state.activePage,
      });
    }
  }
  handleSelect(value) {
    this.setState({ activePage: value });
  }
  insert() {
    this.props.insert(this.state.input);
    const updateObj = {};
    Object.keys(this.state.input).forEach((key) => {
      updateObj[key] = { $set: '' };
    });
    if (this.state.option.erase) {
      this.setState({
        input: update(
          this.state.input,
          updateObj,
        ),
      });
      this.firstInputForm.focus();
    }
  }
  handleInputChange(e, prop) {
    const updateObj = {};
    updateObj[prop] = { $set: e.target.value };
    this.setState({
      activePage: 1,
      input: update(
        this.state.input,
        updateObj,
      ),
    });
  }
  handleOptions(option) {
    const updateObj = {};
    updateObj[option] = { $set: !this.state.option[option] };
    this.setState({
      option: update(
        this.state.option,
        updateObj,
      ),
    });
  }
  render() {
    if (!this.props.list) {
      return null;
    }
    let list = this.props.list;
    if (this.state.option.filter) {
      this.props.structure.forEach((f) => {
        list = listFinder(list, f.key, this.state.input[f.stateKey]);
      });
    }
    if (!list) {
      list = [];
    }
    const showList = list.slice(
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
                style={styles.button}
              >
                <MenuItem active={this.state.itemInList === 10} eventKey={10}>10개씩 보기</MenuItem>
                <MenuItem active={this.state.itemInList === 20} eventKey={20}>20개씩 보기</MenuItem>
                <MenuItem active={this.state.itemInList === 50} eventKey={50}>50개씩 보기</MenuItem>
              </DropdownButton>
              <Button
                style={styles.button}
                bsStyle="primary"
                onClick={this.props.refresh}
              >새로 고침</Button>
              <Button
                style={styles.button}
                bsStyle="danger"
                onClick={this.props.removeAllClick}
              >전부 삭제</Button>
            </ButtonGroup>
          </div>
          <InputGroupRadium style={styles.rightButtons.group}>
            <DropdownButton
              id="dropDownWine2"
              style={styles.rightButtons.dropdownButton}
              componentClass={InputGroup.Button}
              open={this.state.option.toggle}
              onToggle={(t, e, s) =>
                s.source !== 'select' ?
                  this.setState(
                    { option: update(
                      this.state.option,
                      {
                        toggle: { $set: !this.state.option.toggle },
                      }),
                    }) : null
              }
              title="설정"
            >
              <MenuItem
                key={1}
                eventKey={1}
                style={styles.rightButtons.dropDownMenu}
              >
                <Button
                  bsStyle={this.state.option.filter ? 'primary' : 'default'}
                  style={styles.rightButtons.dropdownButton}
                  onClick={() => this.handleOptions('filter')}
                >필터링</Button>
              </MenuItem>
              <MenuItem
                key={2}
                eventKey={2}
                style={styles.rightButtons.dropDownMenu}
              >
                <Button
                  bsStyle={this.state.option.erase ? 'primary' : 'default'}
                  style={styles.rightButtons.dropdownButton}
                  onClick={() => this.handleOptions('erase')}
                >추가 시 입력값 삭제</Button>
              </MenuItem>
            </DropdownButton>
          </InputGroupRadium>
          <form onSubmit={e => e.preventDefault()}>
            <Table
              style={styles.table}
              striped
              bordered
              hover
            >
              <thead>
                <tr>
                  <th style={[styles.table_th.base, styles.table_th.number]}>번호</th>
                  {
                    this.props.structure.map(obj =>
                      <th key={obj.name} style={[styles.table_th.base, obj.style]}>{obj.name}</th>,
                    )
                  }
                </tr>
                <tr>
                  <th
                    style={styles.table_th.input}
                  >
                    <a
                      style={styles.table_th.inputBtn}
                      onClick={this.insert}
                    >
                      추가</a>
                  </th>
                  {
                    this.props.structure.map((obj, i) =>
                      <th
                        key={obj.stateKey}
                        style={styles.table_th.input}
                      >
                        <FormControl
                          type="text"
                          inputRef={i === 0 ? ref => this.firstInputForm = ref : null}
                          style={styles.table_th.textInput}
                          value={this.state.input[obj.stateKey]}
                          onKeyPress={e => e.key === 'Enter' ? this.insert() : null}
                          onChange={e => this.handleInputChange(e, obj.stateKey)}
                        />
                      </th>,
                    )
                  }
                </tr>
              </thead>
              <tbody>
                {
                  showList.map((item, i) =>
                    (
                      <tr
                        key={item._id}
                        onClick={() =>
                          this.props.rowClick(item)
                        }
                        style={styles.table_tr}
                      >
                        <td>{((this.state.activePage - 1) * this.state.itemInList) + i + 1}</td>
                        {
                          this.props.structure.map(obj =>
                            <td
                              key={`${item._id}${obj.stateKey}`}
                            >
                              {
                                objectKeyFollower(item, obj.key)
                              }
                            </td>,
                          )
                        }
                      </tr>
                    ))
                }
              </tbody>
            </Table>
          </form>
          <div style={styles.pagination}>
            <Pagination
              bsSize="medium"
              items={Math.ceil(list.length / this.state.itemInList)}
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

export default Radium(ListA);
