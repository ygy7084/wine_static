import React from 'react';
import Radium from 'radium';
import { Table, Pagination, Form, FormGroup, FormControl } from 'react-bootstrap';

class MemberList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      list: this.props.list,
      findInput: '',
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
    const input = e.target.value;
    if (input === '') {
      this.setState({
        list: this.props.list,
        findInput: '',
        activePage: 1,
      });
    } else {
      const regex = new RegExp(input);
      const found = [];
      for (const member of this.props.list) {
        if (member && regex.exec(member.phone)) { found.push(member); }
      }
      this.setState({
        list: found,
        findInput: input,
        activePage: 1,
      });
    }
  }
  render() {
    return (
      <div>
        <h1>관리자 페이지</h1>
        <Table
          style={styles.table}
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th style={styles.table_th}>번호</th>
              <th style={styles.table_th}>포인트</th>
              <th style={styles.table_th}>이름</th>
              <th style={styles.table_th}>생일</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.list.map((r, i) => {
                const active = this.state.activePage;
                if (i >= (active - 1) * 10 && i < active * 10) {
                  const t = JSON.parse(JSON.stringify(r));
                  for (const a in t) {
                    if (t.hasOwnProperty(a)) {
                      if (!t[a]) {
                        t[a] = '';
                      } else if (a === 'birth') {
                        t[a] = new Date(t[a]).toLocaleDateString();
                      }
                    }
                  }
                  return (
                    <tr
                      key={r.phone}
                      style={styles.table_tr}
                      onClick={() => {
                        this.props.memberClick(r);
                      }}
                    >
                      <td style={styles.tabel_tr_td}>{r.phone}</td>
                      <td style={styles.tabel_tr_td}>{r.point}</td>
                      <td style={styles.tabel_tr_td}>{r.name}</td>
                      <td style={styles.tabel_tr_td}>{t.birth}</td>

                    </tr>
                  );
                }
              })
            }
          </tbody>
        </Table>
        <FormGroup controlId="formControlsText">
          <FormControl
            style={styles.findForm}
            type="text"
            onChange={this.handleFind}
            value={this.state.findInput}
          />
        </FormGroup>
        <Pagination
          bsSize="medium"
          items={Math.ceil(this.state.list.length / 10)}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
          prev
          next
        />
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
    textAlign: 'center',
    margin: 'auto',
  },
};

export default Radium(MemberList);
