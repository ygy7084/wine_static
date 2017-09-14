import React from 'react';
import Radium, { StyleRoot } from 'radium';
import {
  Table,
  Pagination,
  InputGroup,
} from 'react-bootstrap';

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

class Original extends React.Component {
  render() {
    return (
      <div>
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
            </tr>
          </thead>
          <tbody>
            {
              this.props.list.map((item, i) =>
                (
                  <tr
                    key={item._id}
                    onClick={() =>
                      this.props.handleWineClick(item)
                    }
                    style={styles.table_tr}
                  >
                    <td>{((this.props.activePage - 1) * this.props.itemInList) + i + 1}</td>
                    <td>{item.eng_shortname}</td>
                    <td>{item.kor_shortname}</td>
                    <td>{item.category}</td>
                    <td>{item.country}</td>
                    <td>{item.region}</td>
                  </tr>
                ))
            }
          </tbody>
        </Table>
        <div style={styles.pagination}>
          <Pagination
            bsSize="medium"
            items={Math.ceil(this.props.list.length/this.props.itemInList)}
            activePage={this.props.activePage}
            onSelect={this.props.handleActivePageSelect}
            prev
            next
          />
        </div>
      </div>
    );
  }
}

export default Radium(Original);
