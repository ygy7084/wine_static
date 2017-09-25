import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import {
  vintage,
  sale,
  shop,
} from '../actions';

import {
  TableModal,
  VintageList,
  ShopList,
  SaleList,
  SaleModal,
  SaleInsertModal,
  RemoveModal,
} from '../components';

import {
  loader,
  errorHandler,
} from '../modules';

class Sale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saleModalItem: null,
      saleInsertModalItem: null,
      shopItem: null,
    };
    this.shopLoad = this.shopLoad.bind(this);
    this.shopClick = this.shopClick.bind(this);
    this.shopUnClick = this.shopUnClick.bind(this);
    this.shopSelectClick = this.shopSelectClick.bind(this);
    this.vintageLoad = this.vintageLoad.bind(this);
    this.saleLoad = this.saleLoad.bind(this);
    this.saleClick = this.saleClick.bind(this);
    this.vintageClick = this.vintageClick.bind(this);
    this.saleInsert = this.saleInsert.bind(this);
    this.saleModify = this.saleModify.bind(this);
    this.saleRemove = this.saleRemove.bind(this);
    this.saleRemoveAll = this.saleRemoveAll.bind(this);
  }
  componentWillMount() {
    this.saleLoad();
    this.vintageLoad();
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
  shopClick(shop, url) {
    this.setState({ shopItem: shop });
    this.props.changePage(url);
  }
  shopSelectClick(url) {
    this.shopLoad();
    this.setState({ shopItem: null });
    this.props.changePage(url);
  }
  shopUnClick() {
    this.setState({ shopItem: null });
  }
  vintageLoad() {
    loader.on();
    this.props.vintageGetListRequest()
      .then((data) => {
        if (this.props.vintageGetList.status === 'SUCCESS') {
          loader.off();
        } else if (this.props.vintageGetList.status === 'FAILURE') {
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
  saleClick(sale) {
    this.setState({
      saleModalItem: sale,
    });
    this.props.changePage('/wine/sale/modal');
  }
  vintageClick(vintage) {
    this.setState({
      saleInsertModalItem: vintage,
    });
    this.props.changePage('/wine/sale/vintage/insertmodal');
  }
  saleInsert(sale) {
    loader.on();
    this.props.saleInsertRequest(sale)
      .then((data) => {
        if (this.props.saleInsert.status === 'SUCCESS') {
          this.props.changePage('/wine/sale');
          this.saleLoad();
          loader.off();
        } else if (this.props.saleInsert.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  saleModify(sale) {
    loader.on();
    this.props.saleModifyRequest(sale)
      .then((data) => {
        if (this.props.saleModify.status === 'SUCCESS') {
          this.props.changePage('/wine/sale');
          this.saleLoad();
        } else if (this.props.saleModify.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  saleRemove(sale) {
    loader.on();
    this.props.saleRemoveRequest(sale)
      .then((data) => {
        if (this.props.saleRemove.status === 'SUCCESS') {
          this.props.changePage('/wine/sale');
          this.saleLoad();
        } else if (this.props.saleRemove.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  saleRemoveAll() {
    loader.on();
    this.props.saleRemoveAllRequest()
      .then((data) => {
        if (this.props.saleRemoveAll.status === 'SUCCESS') {
          this.props.changePage('/wine/sale');
          this.saleLoad();
        } else if (this.props.saleRemoveAll.status === 'FAILURE') {
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
    return (
      <div>
        <SaleList
          saleClick={this.saleClick}
          saleRemoveAllClick={() => this.props.changePage('/wine/sale/removeallmodal')}
          saleInsertClick={() => this.props.changePage('/wine/sale/vintage')}
          list={this.props.saleGetList.list}
          refresh={this.saleLoad}
        />
        <Route
          path="/wine/sale/modal"
          render={props =>
            this.state.saleModalItem ?
              <SaleModal
                close={() => this.props.changePage('/wine/sale')}
                sale={this.state.saleModalItem}
                shop={this.state.shopItem}
                saleModify={this.saleModify}
                saleRemove={this.saleRemove}
                shopSelectClick={() => this.shopSelectClick('/wine/sale/modal/shop')}
                {...props}
              /> : <Redirect to="/wine/sale" />
          }
        />
        <Route
          path="/wine/sale/modal/shop"
          render={props =>
            (
              <TableModal
                title="매장 선택"
                subtitle="상품을 연결할 매장을 선택하십시요."
                close={() => this.props.changePage('/wine/sale/modal')}
              >
                <ShopList
                  onlyView
                  shopClick={shop => this.shopClick(shop, '/wine/sale/modal')}
                  list={this.props.shopGetList.list}
                  refresh={this.shopLoad}
                  {...props}
                />
              </TableModal>
            )
          }
        />
        <Route
          path="/wine/sale/vintage"
          render={props => (
            <TableModal
              title="상품 추가"
              subtitle="상품을 추가할 빈티지를 선택하십시요."
              close={() => this.props.changePage('/wine/sale')}
            >
              <VintageList
                onlyView
                vintageClick={this.vintageClick}
                list={this.props.vintageGetList.list}
                refresh={this.vintageLoad}
                {...props}
              />
            </TableModal>
          )}
        />
        <Route
          path="/wine/sale/vintage/insertmodal"
          render={props =>
            this.state.saleInsertModalItem ?
              <SaleInsertModal
                vintage={this.state.saleInsertModalItem}
                close={() => this.props.changePage('/wine/sale/vintage')}
                saleInsert={this.saleInsert}
                shop={this.state.shopItem}
                shopSelectClick={() => this.shopSelectClick('/wine/sale/vintage/insertmodal/shop')}
                {...props}
              /> : <Redirect to="/wine/sale" />
          }
        />
        <Route
          path="/wine/sale/vintage/insertmodal/shop"
          render={props =>
            (
              <TableModal
                title="매장 선택"
                subtitle="상품을 연결할 매장을 선택하십시요."
                close={() => this.props.changePage('/wine/sale/vintage/insertmodal')}
              >
                <ShopList
                  onlyView
                  shopClick={shop => this.shopClick(shop, '/wine/sale/vintage/insertmodal')}
                  list={this.props.shopGetList.list}
                  refresh={this.shopLoad}
                  {...props}
                />
              </TableModal>
            )
          }
        />
        <Route
          path="/wine/sale/removeallmodal"
          render={props =>
            <RemoveModal
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="상품이 전부 삭제됩니다. "
              handleRemove={this.saleRemoveAll}
              handleClose={() => this.props.changePage('/wine/sale')}
              {...props}
            />
          }
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  shopGetList: {
    status: state.shop.getList.status,
    list: state.shop.getList.list,
  },
  vintageGetList: {
    status: state.vintage.getList.status,
    list: state.vintage.getList.list,
  },
  saleGetList: {
    status: state.sale.getList.status,
    list: state.sale.getList.list,
  },
  saleInsert: {
    status: state.sale.insert.status,
    sale: state.sale.insert.sale,
  },
  saleModify: {
    status: state.sale.modify.status,
  },
  saleRemove: {
    status: state.sale.remove.status,
  },
  saleRemoveAll: {
    status: state.sale.removeAll.status,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  shopGetListRequest: shop.getListRequest,
  vintageGetListRequest: vintage.getListRequest,
  saleGetListRequest: sale.getListRequest,
  saleInsertRequest: sale.insertRequest,
  saleModifyRequest: sale.modifyRequest,
  saleRemoveRequest: sale.removeRequest,
  saleRemoveAllRequest: sale.removeAllRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sale);
