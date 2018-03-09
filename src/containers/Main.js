/* global window */
import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import IconWine from 'react-icons/lib/ti/wine';
import IconConfiguration from 'react-icons/lib/md/settings';
import IconShop from 'react-icons/lib/ti/home-outline';
import IconStoreIn from 'react-icons/lib/ti/arrow-left-outline';
import IconStoreOut from 'react-icons/lib/ti/arrow-right-outline';
import IconCustomer from 'react-icons/lib/ti/user';
import IconStore from 'react-icons/lib/ti/arrow-repeat-outline';
import IconCustomerBase from 'react-icons/lib/go/key';
import IconAccount from 'react-icons/lib/ti/key';
import IconSale from 'react-icons/lib/md/list';
import {
  Account,
  Wine,
  Shop,
  Customer,
  CustomerBase,
  Store,
  SaleForShop,
  StoreIn,
  StoreOut,
  Configuration,
} from './';
import {
  Header,
  Contents,
  Page404,
} from '../components';

const SIDE_LIST_ITEMS = [
  { name: '계정',
    path: '/account',
    icon: IconAccount,
    authority: ['관리자'] },
  { name: '와인',
    path: '/wine',
    icon: IconWine,
    authority: ['관리자'] },
  { name: '상품',
    path: '/sale',
    icon: IconSale,
    authority: ['매장'] },
  { name: '매장',
    path: '/shop',
    icon: IconShop,
    authority: ['관리자', '매장'] },
  { name: '고객',
    path: '/customer',
    icon: IconCustomer,
    authority: ['관리자', '매장'] },
  { name: '고객 계정',
    path: '/customerbase',
    icon: IconCustomerBase,
    authority: ['관리자'] },
  { name: '입고',
    path: '/storein',
    icon: IconStoreIn,
    authority: ['관리자', '매장'] },
  { name: '출고',
    path: '/storeout',
    icon: IconStoreOut,
    authority: ['관리자', '매장'] },
  { name: '입출고 내역',
    path: '/store',
    icon: IconStore,
    authority: ['관리자', '매장'] },
  { name: '설정',
    path: '/configuration',
    icon: IconConfiguration,
    authority: ['관리자'],
  },
];
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuClose: window.innerWidth < 768,
      sideListItems: SIDE_LIST_ITEMS.map(item => ({
        ...item,
        path: `${this.props.match.url}${item.path}`,
      })),
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.menuClick = this.menuClick.bind(this);
  }
  toggleMenu() {
    this.setState({
      menuClose: !this.state.menuClose,
    });
  }
  menuClick(path) {
    this.setState({
      menuClose:
        window.innerWidth < 768 ? true : this.state.menuClose });
    this.props.changePage(`${path}`);
  }
  render() {
    const { match } = this.props;
    if (
      this.props.accountSession.account && (
        !this.props.accountSession.account.level === '관리자' ||
        !this.props.accountSession.account.level === '매장')
    ) {
      return <Redirect to="/" />;
    } else if (
      !this.props.accountSession.account
    ) {
      return <Redirect to={`${match.url}`} />;
    }
    return (
      <div>
        <Route
          path={`${match.url}`}
          render={props => (
            <Header
              {...props}
              toggleMenu={this.toggleMenu}
              menuClick={this.menuClick}
              menuClose={this.state.menuClose}
              account={this.props.accountSession.account}
              logout={this.props.logout}
              sideListItems={this.state.sideListItems}
            />
          )}
        />
        {
          <Contents menuClose={this.state.menuClose} >
            {
              this.props.accountSession.account &&
                this.props.accountSession.account.level === '매장' &&
                !this.props.accountSession.account.shop ?
                null :
                <Switch>
                  <Route
                    exact
                    path={`${match.url}`}
                    render={() => (
                      this.props.accountSession.account.level === '관리자' ?
                        <Redirect to={`${match.url}/account`} /> :
                        <Redirect to={`${match.url}/store`} />
                    )}
                  />
                  <Route path={`${match.url}/account`} component={Account} />
                  <Route path={`${match.url}/wine`} component={Wine} />
                  <Route path={`${match.url}/sale`} component={SaleForShop} />
                  <Route path={`${match.url}/shop`} component={Shop} />
                  <Route path={`${match.url}/customer`} component={Customer} />
                  <Route path={`${match.url}/customerbase`} component={CustomerBase} />
                  <Route path={`${match.url}/storein`} component={StoreIn} />
                  <Route path={`${match.url}/storeout`} component={StoreOut} />
                  <Route path={`${match.url}/store`} component={Store} />
                  <Route path={`${match.url}/configuration`} component={Configuration} />
                  <Route component={Page404} />
                </Switch>
            }
          </Contents>
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  accountSession: {
    status: state.account.session.status,
    account: state.account.session.account,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
