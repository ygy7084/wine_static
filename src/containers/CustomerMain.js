/* global window */
import React from 'react';
import BodyBackgroundColor from 'react-body-backgroundcolor';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import {
  customerBase,
} from '../actions';
import {
  CustomerSideStore,
  CustomerSideCard,
  CustomerSideMenu,
  CustomerSideModal,
  CustomerSideBaseModal,
} from '../components';
import {
  errorHandler,
  loader,
  notify,
} from '../modules';

import './CustomerMain.css';

class CustomerMain extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      menuToggle: false,
      mode: '보관 와인 리스트',
      shop: '전체',
      cardIndex: 0,
      customerSideBaseModalOn: false,
    };

    this.selectMode = this.selectMode.bind(this);
    this.selectShop = this.selectShop.bind(this);
    this.customerBaseModify = this.customerBaseModify.bind(this);
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
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        errorHandler(data);
      });
  }
  selectMode(mode) {
    this.setState({
      menuToggle: false,
      cardIndex: 0,
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
  customerBaseModify(customerBase) {
    loader.on();
    this.props.customerBaseModifyRequest(customerBase)
      .then((data) => {
        if (this.props.customerBaseModify.status === 'SUCCESS') {
          loader.off();
          notify('수정 완료');
          this.setState({ customerSideBaseModalOn: false });
          this.props.logout();
        } else if (this.props.customerBaseModify.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
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
    return (
      <BodyBackgroundColor backgroundColor={backgroundColor}>
        <div>
          <CustomerSideMenu
            menuClick={(e) => this.setState({ menuToggle: true })}
          />
          {
            this.state.mode === '보관 와인 리스트' ?
              <CustomerSideCard
                list={this.state.shop !== '전체' ?
                  this.props.customerBaseGetStore.list.filter(v => v.shop.name === this.state.shop) :
                  this.props.customerBaseGetStore.list
                }
                index={this.state.cardIndex}
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
            baseModalOn={() => this.setState({ menuToggle: false, customerSideBaseModalOn: true,})}
          />
          <CustomerSideBaseModal
            show={this.state.customerSideBaseModalOn}
            title="고객 계정 정보"
            close={() => this.setState({ customerSideBaseModalOn: false })}
            item={this.props.customerAccountSession.customerAccount}
            modify={this.customerBaseModify}
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
  customerBaseModify: {
    status: state.customerBase.modify.status,
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
  customerBaseModifyRequest: customerBase.modifyRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerMain);
