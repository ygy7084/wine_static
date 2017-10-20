import React from 'react';
import Radium from 'radium';
import { Card, CardFooter, CardImg, CardText, CardBlock,
  CardTitle, CardSubtitle } from 'reactstrap';
import {
  Pagination,
  Table,
} from 'react-bootstrap';
import { configure } from '../modules';

import SwipeableViews from 'react-swipeable-views';

const styles = {
  slide: {
    padding: '10px',
    color: 'black',
    background: 'white',
    width: '95%',
    margin: 'auto',
    textAlign: 'center',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  card: {
    maxWidth: '450px',
    margin: 'auto',
  },
  image: {
    width: '100%',
  },
  contact: {
    cursor: 'pointer',
    textDecoration: 'none',
  },
  cardFooter: {
    margin: '20px 0px 0px',
  },
  table: {
    margin: 'auto auto 15px,',
    textAlign: 'center',
  },
  table_th: {
    base: {
      textAlign: 'center',
    },
    number: {
      width: '15%',
    },
    name: {
      width: '50%',
    },
    vintage: {
      width: '20%',
    },
    total: {
      width: '15%',
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
class CustomerSideCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemInList: 10,
      selected: null,
      index: 0,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(value) {
    this.setState({ activePage: value });
  }
  render() {
    const shopList = [];
    JSON.parse(JSON.stringify(this.props.list)).forEach((item) => {
      const shop = shopList.find(o => o.shop._id === item.shop._id);
      if (shop) {
        item.number = shop.list.length;
        shop.list.push(item)
      } else {
        item.number = 0;
        shopList.push({
          shop: item.shop,
          list: [item],
        });
      }
    });
    let startIndex = (this.state.activePage - 1) * this.state.itemInList;
    let sum = 0;
    const tableArr = [];
    let i = 0;
    shopList.forEach((shop) => {
      if (startIndex < i + shop.list.length) {

        const rowArr = [];
        shop.list.forEach((item, j) => {
          if (startIndex > i) {
            i += 1;
          } else if (sum < this.state.itemInList) {
            rowArr.push(item);
            i += 1;
            sum += 1;
          }
        });
        if (rowArr.length) {
          tableArr.push(
            <div key={shop.shop._id}>
              <div style={{
                background: 'rgb(67, 75, 169)',
                color: 'white',
                textAlign: 'left',
              }}>
                <p style={{
                  margin: 0,
                  padding: '5px',
                }}>{shop.shop.name}</p>
              </div>
              <Table
                style={styles.table}
                striped
                bordered
                hover
              >
                <thead>
                <tr>
                  <th style={[styles.table_th.number, styles.table_th.base]}>번호</th>
                  <th style={[styles.table_th.name, styles.table_th.base]}>와인명</th>
                  <th style={[styles.table_th.vintage, styles.table_th.base]}>빈티지</th>
                  <th style={[styles.table_th.total, styles.table_th.base]}>수량</th>
                </tr>
                </thead>
                <tbody>
                {
                  rowArr.map((row, i) =>
                    <tr
                      key={`${i}${JSON.stringify(row)}`}
                      onClick={() => {this.props.changeIndex(1); this.setState({ selected: row })}}
                      style={styles.hover}
                    >
                      <td style={styles.table_td}>
                        {
                          row.number + 1
                        }
                      </td>
                      <td
                        style={styles.table_td}
                      >
                        {row.original.kor_shortname}
                      </td>
                      <td
                        style={styles.table_td}
                      >
                        {row.vintage.vintage}
                      </td>
                      <td
                        style={styles.table_td}
                      >
                        {row.total}
                      </td>
                    </tr>)
                }
                </tbody>
              </Table>
            </div>
          )
        }
      } else {
        i += shop.list.length;
      }
    });
      return (
        <SwipeableViews
          onChangeIndex={this.props.changeIndex}
          index={this.props.index}
          enableMouseEvents
        >
          <div style={Object.assign({}, styles.slide)}>
            <Card style={styles.card}>
              <CardBlock>
                <CardTitle><h3>보관 와인 리스트</h3></CardTitle>
                {
                  shopList && shopList.length ? tableArr : null
                }
              </CardBlock>
              <CardFooter>
                <Pagination
                  bsSize="medium"
                  items={Math.ceil(this.props.list.length / this.state.itemInList)}
                  maxButtons={6}
                  activePage={this.state.activePage}
                  onSelect={this.handleSelect}
                  prev
                  next
                  first
                  last
                />
              </CardFooter>
            </Card>
          </div>
          {
            this.state.selected ?
              <div key={`${this.state.selected.sale}${this.state.selected.shop}`}
                   style={Object.assign({}, styles.slide)}>
                <Card style={styles.card}>
                  <CardImg
                    top
                    style={styles.image}
                    src={`${configure.imagePath}${this.state.selected.original.photo_url}`}
                    alt="이미지가 없습니다."
                  />
                  <CardBlock>
                    <CardTitle><h3>{this.state.selected.original.kor_fullname}</h3></CardTitle>
                    <CardSubtitle><h4>{this.state.selected.original.eng_fullname}</h4></CardSubtitle>
                    <CardSubtitle>{`빈티지 ${this.state.selected.vintage.vintage}`}</CardSubtitle>
                    <CardSubtitle>{`원산지 ${this.state.selected.original.locationString}`}</CardSubtitle>
                    <CardSubtitle>{`품종 ${this.state.selected.original.grapeString}`}</CardSubtitle>
                    <CardText>
                      <p style={{whiteSpace: 'pre-line'}}>{this.state.selected.original.desc}</p>
                    </CardText>
                  </CardBlock>
                  <CardFooter>
                    <p style={{margin: '0px'}}>{`${this.state.selected.shop.name} ${this.state.selected.total}개 보관`}</p>
                  </CardFooter>
                </Card>
              </div> : null
          }
        </SwipeableViews>
      );
  }
}
export default Radium(CustomerSideCard);
