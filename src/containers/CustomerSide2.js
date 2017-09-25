import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import BodyBackgroundColor from 'react-body-backgroundcolor';
import FlipCard from 'react-flipcard';
import { Pagination } from 'react-bootstrap';
import './CustomerSide.css';

import { bindKeyboard, autoPlay, virtualized } from 'react-swipeable-views-utils';
import { Card, CardHeader, CardFooter, CardImg, CardText, CardBlock,
  CardTitle, CardSubtitle } from 'reactstrap';

import {
  CustomerSideModal2,
} from '../components';
import {configure} from '../modules';

const styles = {
  swipeableViews: {
  },
  slide: {
    padding: '10px',
    color: 'black',
    background: 'white',
    borderRadius: '20px',
    width: '90%',
    margin: 'auto',
    textAlign: 'center',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  menu: {
    textAlign: 'center',
    color: 'white',
    margin: '10px 0px 0px',
    cursor: 'pointer',
  },
  card: {
    maxWidth: '450px',
    margin: 'auto',
  },
  image: {
    width: '100%',
  },
  image2: {
    width: '100%',
    MozTransform: 'rotate(180deg)',
    OTransform: 'rotate(180deg)',
    WebkitTransform: 'rotate(180deg)',
    transform: 'rotate(180deg)',
    filter: 'FlipH',
    msFilter: 'FlipH',
  },
  contact: {
    border: '1px #e7776c solid',
    color: '#e7776c',
    cursor: 'pointer',
    textDecoration: 'none',
    padding: '10px 50px',
    fontSize: '2rem',
    borderRadius: '20px',
  },
  contact_div: {
    marginTop: '30px',
  },
  cardFooter: {
    margin: '20px 0px 0px',
  },
};
const colors = [
  '#9ccee4',
  '#f2c486',
  '#e7776c',
  '#eeabfc',
  '#ffffbc',
  '#ffbcf8',
];
let flipOK = true;
class CustomerSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerSideModal2Toggle: false,
      isFlipped: false,
      list: this.props.list,
      result: this.props.result,
      activePage: 1,
      itemInList: 5,
      cardIndex: 0,
      rearCardDisplay: 'none',
      mode: '입고 와인 조회',
      shop: '전체',
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.toggleFlip = this.toggleFlip.bind(this);
    this.selectMode = this.selectMode.bind(this);
    this.selectShop = this.selectShop.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      list:nextProps.list,
      result:nextProps.result,
    })
  }
  handleSelect(value) {
    this.setState({ activePage: value });
  }
  toggleFlip() {
    if (flipOK) {
      flipOK = !flipOK;
      if (this.state.isFlipped) {
        this.setState({
          isFlipped: !this.state.isFlipped,
        });
        setTimeout(() => {
          this.setState({
            rearCardDisplay: 'none',
          });
        }, 500);
      } else {
        this.setState({
          isFlipped: !this.state.isFlipped,
          rearCardDisplay: 'inherit',
        });
      }
      setTimeout(() => {
        flipOK = true;
      }, 1500);
    }
  }
  selectMode(mode) {
      this.setState({
      customerSideModal2Toggle: false,
      isFlipped: false,
      rearCardDisplay: 'none',
      mode: mode,
    });
  }
  selectShop(shop) {

    if(shop==='전체') {
      this.setState({
        customerSideModal2Toggle: false,
        isFlipped: false,
        cardIndex: 0,
        rearCardDisplay: 'none',
        rearCardDisplay: 'none',
        list: this.props.list,
        result: this.props.result,
        shop: shop,
      });
    } else {

      this.setState({
        customerSideModal2Toggle: false,
        isFlipped: false,
        cardIndex: 0,
        rearCardDisplay: 'none',
        rearCardDisplay: 'none',
        list: this.props.list.filter(obj => obj.shop.name === shop),
        result: this.props.result.filter(obj => obj.shop.name === shop),
        shop: shop,
      });
    }
  }
  render() {
    const cards = [
      {
        image: '/img/test1.jpg',
        title: '베린저',
        subtitle: 'BERINGER',
        year: '2000',
        number: '1',
        shop: '우리샵',
      },
      {
        image: '/img/test2.jpg',
        title: '한글 줄임명',
        subtitle: '영문 줄임명',
        year: '연도',
        number: 'X',
        shop: '지점 이름',
      },
      {
        image: '/img/test3.jpg',
        title: '한글 줄임명',
        subtitle: '영문 줄임명',
        year: '연도',
        number: 'X',
        shop: '지점 이름',
      },
    ];
    let backgroundColor = '#e7776c';
    if (this.state.isFlipped)
      backgroundColor = '#f2c486';
    if (this.state.mode === '입출고 내역 조회')
      backgroundColor = '#9ccee4';

    const list = this.state.list;
    const result = this.state.result;
    console.log(list);
    console.log(result);
    console.log(result[0] ? result[0].sale.vintage.original.photo_url : '')
    return (
      <BodyBackgroundColor backgroundColor={backgroundColor}>
        <div>
          {
            this.state.mode === '입고 와인 조회' ?
              (
                <div>
                  <h4
                    style={styles.menu}
                    onClick={() => this.setState({ customerSideModal2Toggle: true })}
                  >
                    Menu
                  </h4>
                  <FlipCard
                    disabled
                    flipped={this.state.isFlipped}
                  >
                    <SwipeableViews
                      style={styles.swipeableViews}
                      onChangeIndex={i => this.setState({ cardIndex: i })}
                      enableMouseEvents
                    >
                      {
                        result.map((item, i) => (
                          <div key={item.sale._id} style={Object.assign({}, styles.slide)}>
                            <Card style={styles.card}>
                              <CardHeader>
                                <CardTitle><h2>{item.sale.vintage.original.kor_shortname}</h2></CardTitle>
                                <CardSubtitle>{item.sale.vintage.original.eng_shortname}</CardSubtitle>
                                <CardSubtitle>{item.sale.vintage.vintage}</CardSubtitle>
                              </CardHeader>
                              <CardImg
                                onClick={this.toggleFlip}
                                top
                                style={styles.image}
                                src={`${configure.imagePath}${item.sale.vintage.original.photo_url}`}
                                alt="Card image cap"
                              />
                              <CardBlock>
                                <CardText><p>{`${item.remain}개 보유`}</p></CardText>
                                <CardText><h4>{item.shop.name}</h4></CardText>
                                <div style={styles.contact_div}>
                                  <hr />
                                  <a
                                    href={`tel:${item.shop.phone}`}
                                    style={styles.contact}>전화걸기</a>
                                </div>
                              </CardBlock>
                              <CardFooter>
                                <p style={styles.cardFooter}>{`${i + 1}/${result.length}`}</p>
                              </CardFooter>
                            </Card>
                          </div>
                        ))
                      }
                    </SwipeableViews>
                    <div style={Object.assign({}, styles.slide, { display: this.state.rearCardDisplay })}>
                      <Card style={styles.card}>
                        <CardImg
                          onClick={this.toggleFlip}
                          top
                          style={styles.image2}
                          alt="Card image cap"
                          src={result[this.state.cardIndex] ? `${configure.imagePath}${result[this.state.cardIndex].sale.vintage.original.photo_url}` : ''}
                        />
                        <CardBlock>
                          <CardTitle><h4>{result[this.state.cardIndex] ? result[this.state.cardIndex].sale.vintage.original.kor_fullname : ''}</h4></CardTitle>
                          <CardSubtitle><h4>{result[this.state.cardIndex] ? result[this.state.cardIndex].sale.vintage.original.eng_fullname: ''}</h4></CardSubtitle>
                          <CardSubtitle>{result[this.state.cardIndex] ? result[this.state.cardIndex].sale.vintage.vintage : ''}</CardSubtitle>
                        </CardBlock>
                        <CardBlock>
                          <CardText><p>원산지: {result[this.state.cardIndex] ? result[this.state.cardIndex].sale.vintage.original.locationString : ''}</p></CardText>
                          <CardText><p>종류: {result[this.state.cardIndex] ? result[this.state.cardIndex].sale.vintage.original.category : ''}</p></CardText>
                          <div style={styles.contact_div}>
                            <hr />
                            <p>{result[this.state.cardIndex] ? result[this.state.cardIndex].sale.vintage.original.desc : ''}</p>
                          </div>
                        </CardBlock>
                      </Card>
                    </div>
                  </FlipCard>
                </div>
              ) : (
                <div>
                  <h4
                    style={styles.menu}
                    onClick={() => this.setState({ customerSideModal2Toggle: true })}
                  >
                    Menu
                  </h4>
                  <div style={Object.assign({}, styles.slide)}>
                    <Card style={styles.card}>
                      <CardHeader>
                        <CardTitle><h4>입출고 내역</h4></CardTitle>
                      </CardHeader>
                      {
                        this.state.list.map(item => (
                          <div key={Math.random()*10000}>
                            <hr />
                            <CardBlock>
                            <CardText><p>{item.datetimeString}</p></CardText>
                            <CardText><p>{item.sale.vintage.original.kor_shortname}/{item.sale.vintage.vintage}년</p></CardText>
                            <CardText><p>{item.shop.name}<strong>{item.quantityChange > 0 ? '입고' : '출고'} {item.quantityChange}</strong></p></CardText>
                            </CardBlock>
                          </div>
                        ))
                      }
                      <CardFooter>
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
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              )
          }
          <CustomerSideModal2
            toggle={this.state.customerSideModal2Toggle}
            selectMode={this.selectMode}
            selectShop={this.selectShop}
            mode={this.state.mode}
            shop={this.state.shop}
            shopList={this.state.result ? ['전체'].concat(this.props.uniqueShop) : ['전체']}
            close={() => this.setState({ customerSideModal2Toggle: false })}
          />
        </div>
      </BodyBackgroundColor>
    );
  }
}
export default CustomerSide;