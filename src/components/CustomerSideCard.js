import React from 'react';
import { Card, CardHeader, CardFooter, CardImg, CardText, CardBlock,
  CardTitle, CardSubtitle } from 'reactstrap';
import { Pagination } from 'react-bootstrap';
import IconPhone from 'react-icons/lib/ti/phone';
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
};
class CustomerSideCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemInList: 5,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(value) {
    this.setState({ activePage: value });
  }
  render() {
    const showList = this.props.list.slice(
      (this.state.activePage - 1) * this.state.itemInList,
      this.state.activePage * this.state.itemInList);
    return (
      <SwipeableViews
        onChangeIndex={this.props.changeIndex}
        enableMouseEvents
      >
        <div style={Object.assign({}, styles.slide)}>
          <Card style={styles.card}>
            <CardBlock>
              <CardTitle><h3>입고 와인 리스트</h3></CardTitle>
              {
                showList.map((item, i) => (
                  <div key={i}>
                    <hr style={{ margin: '5px' }} />
                    <CardBlock>
                      <CardText>
                        <h5>{`${item.original.kor_shortname}  ${item.original.eng_shortname}`}</h5>
                        <p>{`빈티지 ${item.vintage.vintage}`}</p>
                        <p>
                          <a
                            href={`tel:${item.shop.phone}`}
                            style={styles.contact}
                          >
                            {`${item.shop.name}`}<IconPhone />{`에서 ${item.total}개 보관 중입니다.`}
                          </a>
                        </p>
                      </CardText>
                    </CardBlock>
                  </div>
                ))
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
              <p style={styles.cardFooter}>{`1/${this.props.list.length + 1}`}</p>
            </CardFooter>
          </Card>
        </div>
        {
          this.props.list.map((item, i) => (
            <div key={`${item._id.sale}${item._id.shop}`} style={Object.assign({}, styles.slide)}>
              <Card style={styles.card}>
                <CardImg
                  top
                  style={styles.image}
                  src={`${configure.imagePath}${item.original.photo_url}`}
                  alt="Card image cap"
                />
                <CardBlock>
                  <CardTitle><h3>{item.original.kor_fullname}</h3></CardTitle>
                  <CardSubtitle><h4>{item.original.eng_fullname}</h4></CardSubtitle>
                  <CardSubtitle>{`빈티지 ${item.vintage.vintage}`}</CardSubtitle>
                  <CardSubtitle>{`원산지 ${item.original.locationString}`}</CardSubtitle>
                  <CardSubtitle>{`품종 ${item.original.grapeString}`}</CardSubtitle>
                  <CardText>
                    <p>{item.original.desc}</p>
                  </CardText>
                </CardBlock>
                <CardFooter>
                  <p style={{ margin: '0px' }}>{`${item.shop.name} ${item.total}개 보관`}</p>
                  <p style={styles.cardFooter}>{`${i + 2}/${this.props.list.length + 1}`}</p>
                </CardFooter>
              </Card>
            </div>
          ))
        }
      </SwipeableViews>
    );
  }
}
export default CustomerSideCard;
