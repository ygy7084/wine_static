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
  CustomerSideModal,
} from '../components';

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
      customerSideModalToggle: false,
      isFlipped: false,
      cardIndex: 0,
      rearCardDisplay: 'none',
      mode: '입고 와인 조회',
      shop: '전체',
    };
    this.toggleFlip = this.toggleFlip.bind(this);
    this.selectMode = this.selectMode.bind(this);
    this.selectShop = this.selectShop.bind(this);
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
      customerSideModalToggle: false,
      isFlipped: false,
      rearCardDisplay: 'none',
      mode: mode,
    });
  }
  selectShop(shop) {
    this.setState({
      customerSideModalToggle: false,
      isFlipped: false,
      cardIndex: 0,
      rearCardDisplay: 'none',
      shop: shop,
    });
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
    return (
      <BodyBackgroundColor backgroundColor={backgroundColor}>
        <div>
          {
            this.state.mode === '입고 와인 조회' ?
              (
                <div>
                  <h4
                    style={styles.menu}
                    onClick={() => this.setState({ customerSideModalToggle: true })}
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
                        cards.map((item, i) => (
                          <div key={item.image} style={Object.assign({}, styles.slide)}>
                            <Card style={styles.card}>
                              <CardHeader>
                                <CardTitle><h2>{item.title}</h2></CardTitle>
                                <CardSubtitle>{item.subtitle}</CardSubtitle>
                                <CardSubtitle>{item.year}</CardSubtitle>
                              </CardHeader>
                              <CardImg
                                onClick={this.toggleFlip}
                                top
                                style={styles.image}
                                src={item.image}
                                alt="Card image cap"
                              />
                              <CardBlock>
                                <CardText><p>{`${item.number}개 보유`}</p></CardText>
                                <CardText><h4>{item.shop}</h4></CardText>
                                <div style={styles.contact_div}>
                                  <hr />
                                  <a
                                    href="tel:01044280501"
                                    style={styles.contact}>전화걸기</a>
                                </div>
                              </CardBlock>
                              <CardFooter>
                                <p style={styles.cardFooter}>{`${i + 1}/${cards.length}`}</p>
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
                          src={cards[this.state.cardIndex].image}
                        />
                        <CardBlock>
                          <CardTitle><h4>한글 풀네임</h4></CardTitle>
                          <CardSubtitle><h4>English Fullname</h4></CardSubtitle>
                          <CardSubtitle>2000</CardSubtitle>
                        </CardBlock>
                        <CardBlock>
                          <CardText><p>원산지: 프랑스/보르도</p></CardText>
                          <CardText><p>종류: 레드</p></CardText>
                          <div style={styles.contact_div}>
                            <hr />
                            <p>설명이 들어갑니다. 설명이 들어갑니다. 설명이 들어갑니다. 설명이 들어갑니다. 설명이 들어갑니다. 설명이 들어갑니다. 설명이 들어갑니다. </p>
                            <p>설명이 들어갑니다. 설명이 들어갑니다. 설명이 들어갑니다. 설명이 들어갑니다. 설명이 들어갑니다. 설명이 들어갑니다. 설명이 들어갑니다. </p>
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
                    onClick={() => this.setState({ customerSideModalToggle: true })}
                  >
                    Menu
                  </h4>
                  <div style={Object.assign({}, styles.slide)}>
                    <Card style={styles.card}>
                      <CardHeader>
                        <CardTitle><h4>입출고 내역</h4></CardTitle>
                      </CardHeader>
                      <hr />
                      <CardBlock>
                        <CardText><p>2017/6/20 20:00</p></CardText>
                        <CardText><p>샤토 팔머/2000년</p></CardText>
                        <CardText><p>키비스트 <strong>입고 2</strong></p></CardText>
                      </CardBlock>
                      <hr />
                      <CardBlock>
                        <CardText><p>2017/6/20 20:00</p></CardText>
                        <CardText><p>샤토 팔머/2000년</p></CardText>
                        <CardText><p>키비스트 <strong>출고 2</strong></p></CardText>
                      </CardBlock>
                      <hr />
                      <CardBlock>
                        <CardText><p>2017/6/20 20:00</p></CardText>
                        <CardText><p>샤토 팔머/2000년</p></CardText>
                        <CardText><p>키비스트 <strong>출고 2</strong></p></CardText>
                      </CardBlock>
                      <hr />
                      <CardBlock>
                        <CardText><p>2017/6/20 20:00</p></CardText>
                        <CardText><p>샤토 팔머/2000년</p></CardText>
                        <CardText><p>키비스트 <strong>출고 2</strong></p></CardText>
                      </CardBlock>
                      <hr />
                      <CardBlock>
                        <CardText><p>2017/6/20 20:00</p></CardText>
                        <CardText><p>샤토 팔머/2000년</p></CardText>
                        <CardText><p>키비스트 <strong>출고 2</strong></p></CardText>
                      </CardBlock>
                      <hr />
                      <CardFooter>
                        <Pagination
                          bsSize="medium"
                          items={5}
                          activePage={1}
                          prev
                          next
                        />
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              )
          }
          <CustomerSideModal
            toggle={this.state.customerSideModalToggle}
            selectMode={this.selectMode}
            selectShop={this.selectShop}
            mode={this.state.mode}
            shop={this.state.shop}
            close={() => this.setState({ customerSideModalToggle: false })}
          />
        </div>
      </BodyBackgroundColor>
    );
  }
}
export default CustomerSide;
