import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import {
  sale,
  store,
  customer,
  shop,
} from '../actions';
import {
  CustomerSide,
  CustomerSide2,
} from './';

import {
  Page404,
} from '../components';
import {
  loader,
  errorHandler
} from '../modules';

class CustomerEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeModalItem: null,
      saleItem: null,
      shopItem: null,
      customerItem: null,
      bulk: [],
    };
    this.shopLoad = this.shopLoad.bind(this);
    this.customerLoad = this.customerLoad.bind(this);
    this.saleLoad = this.saleLoad.bind(this);
    this.storeLoad = this.storeLoad.bind(this);
  }
  componentWillMount() {
    this.storeLoad();
    this.customerLoad();
    this.saleLoad();
    this.shopLoad();
  }
  shopLoad() {
    loader.on();
    this.props.shopGetListRequest()
      .then((data) => {
        if (this.props.shopGetList.status === 'SUCCESS') {
          loader.off();
        } else if (this.props.shopGetList.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  customerLoad() {
    loader.on();
    this.props.customerGetListRequest()
      .then((data) => {
        if (this.props.customerGetList.status === 'SUCCESS') {
          loader.off();
        } else if (this.props.customerGetList.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  saleLoad() {
    loader.on();
    this.props.saleGetListRequest()
      .then((data) => {
        if (this.props.saleGetList.status === 'SUCCESS') {
          loader.off();
        } else if (this.props.saleGetList.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  storeLoad() {
    loader.on();
    this.props.storeGetListRequest()
      .then((data) => {
        if (this.props.storeGetList.status === 'SUCCESS') {
          loader.off();
        } else if (this.props.storeGetList.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }

  render() {
    console.log(this.props.customerGetList.list);
    return (
      <div>
        {this.props.customerGetList.list.length ?
          <Route
            path="/customerid/:id"
            render={(routeProps) => {
              console.log(routeProps.match.params.id)
              if(routeProps.match.params.id==='test') {
                return <CustomerSide />;
              }
              else if (this.props.customerGetList.list.find(obj => obj._id === routeProps.match.params.id)) {
                const storeList = this.props.storeGetList.list.filter(obj => obj.customer._id === routeProps.match.params.id);
                const result =  this.props.storeGetList.result.filter(obj => obj.customer._id === routeProps.match.params.id);
                const uniqueShop = this.props.storeGetList.result.map(obj => obj.shop.name)
                  .filter((v, i, s) => s.indexOf(v) === i);
                return <CustomerSide2 list={storeList} result={result} uniqueShop={uniqueShop} />;
              }
              // return null;
              return <Page404 {...routeProps} />;
            }}
          />
          : null
        }
        <Route exact path="/customer" component={Page404}/>

      </div>
    );
  }
};
const mapStateToProps = state => ({
  customerGetList: {
    status: state.customer.getList.status,
    list: state.customer.getList.list,
  },
  shopGetList: {
    status: state.shop.getList.status,
    list: state.shop.getList.list,
  },
  saleGetList: {
    status: state.sale.getList.status,
    list: state.sale.getList.list,
  },
  storeGetList: {
    status: state.store.getList.status,
    list: state.store.getList.list,
    result: state.store.getList.result,
  },
  storeInsert: {
    status: state.store.insert.status,
  },
  storeBulkInsert: {
    status: state.store.bulkInsert.status,
  },
  storeRemoveAll: {
    status: state.store.removeAll.status,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  customerGetListRequest: customer.getListRequest,
  shopGetListRequest: shop.getListRequest,
  saleGetListRequest: sale.getListRequest,
  storeGetListRequest: store.getListRequest,
  storeInsertRequest: store.insertRequest,
  storeBulkInsertRequest: store.bulkInsertRequest,
  storeRemoveAllRequest: store.removeAllRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerEntry);
