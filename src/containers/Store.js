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
  StoreList,
  SaleModal,
} from '../components';
import {
  loader,
  errorHandler,
} from '../modules';
import structures from './structures';

class StoreHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saleModalItem: null,
    };
    this.storeLoad = this.storeLoad.bind(this);
    this.storeClick = this.storeClick.bind(this);
  }
  componentWillMount() {
    this.storeLoad();
  }
  storeLoad() {
    loader.on();
    this.props.storeGetListRequest(
      this.props.accountSession.account.level === '매장' ?
        this.props.accountSession.account.shop : null)
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
  storeClick(store) {
    const obj = JSON.parse(JSON.stringify(store.sale));
    obj.shop = store.shop;
    this.setState({
      saleModalItem: obj,
    });
    this.props.changePage('/store/salemodal');
  }
  render() {
    return (
      <div>
        <StoreList
          deleteLock={
            this.props.accountSession.account &&
              this.props.accountSession.account.level === '매장'
          }
          list={this.props.storeGetList.list}
          structure={structures.store}
          rowClick={this.storeClick}
          removeAllClick={() => this.props.changePage('/store/removeallmodal')}
          refresh={() => this.storeLoad()}
          outputTable={e => console.log(e)}
        />
        <Route
          path="/store/salemodal"
          render={props =>
            this.state.saleModalItem ?
              <SaleModal
                onlyView
                imageView
                mode="modify"
                close={() => this.props.changePage('/store')}
                item={this.state.saleModalItem}
              /> : <Redirect to="/store" />
          }
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  accountSession: {
    status: state.account.session.status,
    account: state.account.session.account,
  },
  storeGetList: {
    status: state.store.getList.status,
    list: state.store.getList.list,
    result: state.store.getList.result,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  storeGetListRequest: store.getListRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoreHistory);
