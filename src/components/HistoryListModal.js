import React from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';


class HistoryListModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(value) {
    this.setState({ activePage: value });
  }
  render() {
    const list = this.props.list.sort((A, B) => {
      return B.datetime.getTime() - A.datetime.getTime();
    });
    return (
      <Modal
        show={this.props.show}
        style={styles.modal}
        bsSize='large'
      >
        <ModalHeader>
          <h1>포인트 변경 내역</h1>
        </ModalHeader>
        <ModalBody>
          <Table
            style={styles.table}
            striped
            bordered
            hover
          >
            <thead>
              <tr>
                <th style={styles.table_th_date}>날짜</th>
                <th style={styles.table_th_point}>포인트</th>
                <th style={styles.table_th_memo}>내용</th>
              </tr>
            </thead>
            <tbody>
              {

                this.props.list && this.props.list.length ?
                list.map((r, i) => {
                  const active = this.state.activePage;
                  const obj = r;
                  switch (obj.mode) {
                    case 0: obj.mode = '적립'; break;
                    case 1: obj.mode = obj.memo && obj.memo.length ? '사용 : '.concat(obj.memo) : '사용'; break;
                    case 2: obj.mode = '수정'; break;
                  }
                  if (i >= (active - 1) * 10 && i < active * 10) {
                    return (
                      <tr
                        key={Math.random()*1000}
                        style={styles.table_tr}
                      >
                        <td style={styles.tabel_tr_td}>{obj.datetime.toLocaleString()}</td>
                        <td style={styles.tabel_tr_td}>{obj.point}</td>
                        <td style={styles.tabel_tr_td}>{obj.mode}</td>
                      </tr>
                    );
                  }
                })
                  :
                  null
              }
            </tbody>
          </Table>
          {
            this.props.list && this.props.list.length ?
              <Pagination
                bsSize="medium"
                items={Math.ceil(this.props.list.length / 10)}
                activePage={this.state.activePage}
                onSelect={this.handleSelect}
                prev
                next
              />
              :
              null
          }
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.props.close}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

HistoryListModal.propTypes = {
  list: PropTypes.array.isRequired,
};
HistoryListModal.defaultProps = {
  list : [],
};

const styles = {
  modal: {
    width: '100%',
  },
  title: {
    color: 'black',
    textAlign: 'center',
    marginTop: '125px',
  },
  member: {
    color: 'black',
    textAlign: 'center',
  },
  table: {
    margin: 'auto',
    textAlign: 'center',
    fontSize: '1.5rem',
  },
  table_th_date: {
    textAlign: 'center',
    width : '35%'
  },
  table_th_point: {
    textAlign: 'center',
    width : '15%'
  },
  table_th_memo: {
    textAlign: 'center',
    width : '50%'
  },
  tabel_tr_td: {
    padding: '1rem',
  },

  table_tr: {
    ':hover': {
      cursor: 'pointer',
    },
  },
};

export default HistoryListModal;
