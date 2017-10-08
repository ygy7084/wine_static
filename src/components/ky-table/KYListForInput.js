import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import TextTruncate from 'react-text-truncate';

import {
  Table,
  FormControl,
} from 'react-bootstrap';

const styles = {
  table: {
    margin: 'auto',
    textAlign: 'center',
  },
  table_th: {
    base: {
      textAlign: 'center',
    },
    input: {
      background: 'bisque',
    },
  },
  hover: {
    ':hover': {
      cursor: 'pointer',
    },
  },
  table_td: {
    verticalAlign: 'middle',
  },
};
function KYListForInput(props) {
  return (
    <Table
      style={styles.table}
      striped
      bordered
      hover={props.hovering}
    >
      <thead>
        <tr>
          {
            props.numbering ?
              <th style={styles.table_th.base}>번호</th> : null
          }
          {
            props.cols ? props.cols.map((col, i) =>
              <th
                key={`${col}${i}`}
                style={[
                  styles.table_th.base,
                  props.colClick ? styles.hover : null,
                  props.inputs ?
                    props.inputs.find(o => o === col) ?
                      styles.table_th.input : null : null,
                ]}
                onClick={props.colClick ? () => props.colClick(col) : null}
              >{col}</th>,
            ) : null
          }

        </tr>
      </thead>
      <tbody>
        {
          props.rows ? props.rows.map((row, i) =>
            (
              <tr
                key={`${i}row`}
                onClick={props.rowClick ? () => props.rowClick(i, row) : null}
                style={
                  props.rowClick ?
                    styles.hover : null
                }
              >
                {
                  props.numbering ?
                    <td style={styles.table_td}>
                      {
                        Object.hasOwnProperty.call(props, 'startNumber') ?
                          props.startNumber + i : (i + 1)
                      }
                    </td> : null
                }
                {
                  row.map((data, di) =>
                    <td
                      key={`${i}col${di}`}
                      style={styles.table_td}
                    >
                      {
                        props.truncate ?
                          <TextTruncate
                            line={1}
                            truncateText="..."
                            text={data}
                          /> :
                          props.inputs ?
                            props.inputs.find(o => o === props.cols[di]) ?
                              <FormControl
                                key={`${i}row${di}input`}
                                value={data}
                                onChange={e =>
                                  props.inputChange(
                                    i,
                                    e.target.value,
                                    props.cols[di],
                                  )
                                }
                              /> : data : data
                      }
                    </td>,
                  )
                }
              </tr>
            )) : null
        }
      </tbody>
    </Table>
  );
}
KYListForInput.propTypes = {
  hovering: PropTypes.bool,
  numbering: PropTypes.bool,
  truncate: PropTypes.bool,
  startNumber: PropTypes.number,
  colClick: PropTypes.func,
  rowClick: PropTypes.func,
  cols: PropTypes.arrayOf(PropTypes.string),
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))),
  inputs: PropTypes.arrayOf(PropTypes.string),
  inputChange: PropTypes.func,
};
KYListForInput.defaultProps = {
  hovering: true,
  numbering: true,
  truncate: false,
  startNumber: 1,
  colClick: null,
  rowClick: null,
  cols: [],
  rows: [[]],
  inputs: [{}],
  inputChange: undefined,
};
export default Radium(KYListForInput);
