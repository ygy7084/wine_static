import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import TextTruncate from 'react-text-truncate';

import {
  Table,
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
  },
  hover: {
    ':hover': {
      cursor: 'pointer',
    },
  },
  table_td: {
    verticalAlign: 'middle',
  },
  selected: {
    background: 'lightblue',
  },
  click_td: {
    background: 'antiquewhite',
  },
};
function KYListForSelect(props) {
  console.log(props);
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
                style={[styles.table_th.base, props.colClick ? styles.hover : null]}
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
                key={`${i}${JSON.stringify(row)}`}
                style={[
                  props.rowSelect ?
                    styles.hover : {},
                  props.selectedIndexes.findIndex(o => o === i) > -1 ?
                    styles.selected : {},
                ]}
              >
                {
                  props.numbering ?
                    <td
                      style={styles.table_td}
                      onClick={props.rowSelect ? () => props.rowSelect(i, row) : null}
                    >
                      {
                        Object.hasOwnProperty.call(props, 'startNumber') ?
                          props.startNumber + i : (i + 1)
                      }
                    </td> : null
                }
                {
                  row.map((data, ti) =>
                    <td
                      key={`${data}${ti}`}
                      style={styles.table_td}
                      onClick={props.rowSelect ? () => props.rowSelect(i, row) : null}
                    >
                      {
                        props.truncate ?
                          <TextTruncate
                            line={1}
                            truncateText="..."
                            text={data}
                          /> : data
                      }
                    </td>,
                  )
                }
                {
                  props.rowClick ?
                    <td
                      style={[styles.table_td, styles.click_td]}
                      onClick={() => props.rowClick(i, row)}
                    >상세
                    </td> : null
                }
              </tr>
            )) : null
        }
      </tbody>
    </Table>
  );
}
KYListForSelect.propTypes = {
  hovering: PropTypes.bool,
  numbering: PropTypes.bool,
  truncate: PropTypes.bool,
  startNumber: PropTypes.number,
  colClick: PropTypes.func,
  rowClick: PropTypes.func,
  rowSelect: PropTypes.func,
  cols: PropTypes.arrayOf(PropTypes.string),
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))),
  selectedIndexes: PropTypes.arrayOf(PropTypes.number),
};
KYListForSelect.defaultProps = {
  hovering: true,
  numbering: true,
  truncate: false,
  startNumber: 1,
  colClick: null,
  rowClick: null,
  rowSelect: null,
  cols: [],
  rows: [[]],
  selectedIndexes: [],
};
export default Radium(KYListForSelect);
