import React from 'react';
import { Card, CardHeader, CardFooter, CardImg, CardText, CardBlock,
  CardTitle, CardSubtitle } from 'reactstrap';
import { Pagination } from 'react-bootstrap';


const styles = {
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
  card: {
    maxWidth: '450px',
    margin: 'auto',
  },
};
class CustomerSideStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list,
      activePage: 1,
      itemInList: 5,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.state.list) !== JSON.stringify(nextProps.list)) {
      this.setState({ list: nextProps.list, activePage: 1 });
    }
  }
  handleSelect(value) {
    this.setState({ activePage: value });
  }
  render() {
    const showList = this.state.list.slice(
      (this.state.activePage - 1) * this.state.itemInList,
      this.state.activePage * this.state.itemInList);
    return (
      <div style={Object.assign({}, styles.slide)}>
        <Card style={styles.card}>
          <CardHeader>
            <CardTitle><h4>입출고 내역</h4></CardTitle>
          </CardHeader>
          {
            showList.map(item =>
              <div key={`${item._id}inandout`}>
                <hr />
                <CardBlock>
                  <CardText><p>{new Date(item.datetime).toLocaleString()}</p></CardText>
                  <CardText><p>{item.sale.vintage.original.kor_shortname}/{item.sale.vintage.vintage}년</p></CardText>
                  <CardText><p>{item.shop.name}<strong>{item.quantityChange > 0 ? '입고' : '출고'} {item.quantityChange}</strong></p></CardText>
                </CardBlock>
              </div>,
            )
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
    )
  }
}
export default CustomerSideStore;
