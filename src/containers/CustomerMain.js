/* global window */
import React from 'react';
import async from 'async';
import BodyBackgroundColor from 'react-body-backgroundcolor';

import {
  Route,
  Switch,
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
  customerBase,
  customerAccount,
} from '../actions';

import {
  Account,
  Wine,
  Shop,
  Customer,
  CustomerBase,
  Store,
  SaleBulk,
} from './';

import {
  Header,
  Contents,
  Page404,
  CustomerSideStore,
  CustomerSideCard,
  CustomerSideMenu,
  CustomerSideModal,
} from '../components';

import {
  errorHandler,
  loader,
} from '../modules';

import './CustomerSide.css';

class CustomerMain extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      menuToggle: false,
      mode: '입고 와인 조회',
      shop: '전체',
      cardIndex: 0,
    };

    this.selectMode = this.selectMode.bind(this);
    this.selectShop = this.selectShop.bind(this);
  }
  componentWillMount() {
    loader.on();
    this.props.customerBaseGetStoreRequest(this.props.customerAccountSession.customerAccount._id)
      .then((data) => {
        if (this.props.customerBaseGetStore.status === 'SUCCESS') {
          this.props.customerBaseGetHistoryRequest(this.props.customerAccountSession.customerAccount._id)
            .then((data) => {
              if (this.props.customerBaseGetHistory.status === 'SUCCESS') {
                loader.off();
              } else if (this.props.customerBaseGetHistory.status === 'FAILURE') {
                throw data;
              }
            })
            .catch((data) => {
              errorHandler(data);
            });
        } else if (this.props.customerBaseGetStore.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        errorHandler(data);
        console.log(data);
      });
  }
  selectMode(mode) {
    this.setState({
      menuToggle: false,
      mode,
    });
  }
  selectShop(shop) {
    this.setState({
      menuToggle: false,
      cardIndex: 0,
      shop,
    });
  }
  render() {
    let backgroundColor = 'burlywood';
    if (this.state.cardIndex > 0) {
      backgroundColor = '#e7776c';
    }
    if (this.state.mode === '입출고 내역 조회') {
      backgroundColor = '#9ccee4';
    }
    if (
      this.props.customerBaseGetStore.status !== 'SUCCESS' ||
      this.props.customerBaseGetHistory.status !== 'SUCCESS'
    ) {
      return <BodyBackgroundColor backgroundColor={backgroundColor} />;
    }
    console.log(this.props);
    return (
      <BodyBackgroundColor backgroundColor={backgroundColor}>
        <div>
          <CustomerSideMenu
            menuClick={(e) => this.setState({ menuToggle: true })}
          />
          {
            this.state.mode === '입고 와인 조회' ?
              <CustomerSideCard
                list={this.state.shop !== '전체' ?
                  this.props.customerBaseGetStore.list.filter(v => v.shop.name === this.state.shop) :
                  this.props.customerBaseGetStore.list
                }
                changeIndex={e => this.setState({ cardIndex: e })}
              /> :
              <CustomerSideStore
                list={this.state.shop !== '전체' ?
                  this.props.customerBaseGetHistory.list.filter(v => v.shop.name === this.state.shop) :
                  this.props.customerBaseGetHistory.list
                }
              />
          }
          <CustomerSideModal
            toggle={this.state.menuToggle}
            selectMode={this.selectMode}
            selectShop={this.selectShop}
            mode={this.state.mode}
            shop={this.state.shop}
            logout={this.props.logout}
            shopList={['전체'].concat(this.props.customerBaseGetStore.list.map(o => o.shop.name).filter((v, i, s) => s.indexOf(v) === i))}
            close={() => this.setState({ menuToggle: false })}
          />
        </div>
      </BodyBackgroundColor>
    );
  }
}
const mapStateToProps = state => ({
  customerAccountSession: {
    status: state.customerAccount.session.status,
    customerAccount: state.customerAccount.session.customerAccount,
  },
  customerBaseGetStore: {
    status: state.customerBase.getStore.status,
    list: state.customerBase.getStore.list,
  },
  customerBaseGetHistory: {
    status: state.customerBase.getHistory.status,
    list: state.customerBase.getHistory.list,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  customerBaseGetStoreRequest: customerBase.getStoreRequest,
  customerBaseGetHistoryRequest: customerBase.getHistoryRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerMain);
