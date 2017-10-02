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
  SaleOrVintage,
  RemoveModal,
  CompleteVintageModal,
  CompleteSaleModal,
  VintageListForSale,
  SaleListForSale,
} from '../components';

import {
  loader,
  errorHandler,
} from '../modules';

class SaleBulk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: '상품 리스트',
      saleModalItem: null,
      saleInsertModalItem: null,
      shopItem: null,
      selectedVintage: [],
      selectedSale: [],
      completeVintageModalItem: null,
      completeSaleModalItem: null,
    };
    this.vintageLoad = this.vintageLoad.bind(this);
    this.saleLoad = this.saleLoad.bind(this);
    this.saleClick = this.saleClick.bind(this);
    this.vintageClick = this.vintageClick.bind(this);
    this.saleInsert = this.saleInsert.bind(this);
    this.saleBulkInsert = this.saleBulkInsert.bind(this);
    this.saleBulkModify = this.saleBulkModify.bind(this);
    this.saleModify = this.saleModify.bind(this);
    this.saleRemove = this.saleRemove.bind(this);
    this.saleRemoveAll = this.saleRemoveAll.bind(this);
    this.saleBulkRemove = this.saleBulkRemove.bind(this);
    this.selectVintage = this.selectVintage.bind(this);
    this.showVintageDetail = this.showVintageDetail.bind(this);
    this.selectSale = this.selectSale.bind(this);
    this.showSaleDetail = this.showSaleDetail.bind(this);
    this.selectAll = this.selectAll.bind(this);
  }
  componentWillMount() {
    this.saleLoad();
    this.vintageLoad();
  }
  vintageLoad() {
    loader.on();
    this.props.vintageGetListRequest()
      .then((data) => {
        if (this.props.vintageGetList.status === 'SUCCESS') {
          loader.off();
          this.setState({
            selectedVintage: [],
            selectedSale: [],
          });
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
    this.props.saleGetListRequest(
      this.props.accountSession.account.level === '매장' ?
        this.props.accountSession.account.shop : null,
    )
      .then((data) => {
        if (this.props.saleGetList.status === 'SUCCESS') {
          loader.off();
          this.setState({
            selectedVintage: [],
            selectedSale: [],
          });
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
      completeSaleModalItem: sale,
    });
    this.props.changePage('/sale/modal');
  }
  vintageClick(vintage) {
    this.setState({
      saleInsertModalItem: vintage,
    });
    this.props.changePage('/sale/vintage/insertmodal');
  }
  saleInsert(sale) {
    loader.on();
    this.props.saleInsertRequest(sale)
      .then((data) => {
        if (this.props.saleInsert.status === 'SUCCESS') {
          this.props.changePage('/sale');
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
          this.props.changePage('/sale');
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
          this.props.changePage('/sale');
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
    this.props.saleRemoveAllRequest(
      this.props.accountSession.account.level === '매장' ?
        this.props.accountSession.account.shop : null
    )
      .then((data) => {
        if (this.props.saleRemoveAll.status === 'SUCCESS') {
          this.props.changePage('/sale');
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
  selectVintage(vintage) {
    const found = this.state.selectedVintage.findIndex(obj => obj._id === vintage._id);
    const newVintage = JSON.parse(JSON.stringify(this.state.selectedVintage));
    if (found > -1) {
      newVintage.splice(found, 1);
    } else {
      newVintage.push(vintage);
    }
    this.setState({ selectedVintage: newVintage });
  }
  showVintageDetail(vintage) {
    this.setState({
      completeVintageModalItem: vintage,
    });
    this.props.changePage('/sale/vintagemodal');
  }
  selectSale(sale) {
    const found = this.state.selectedSale.findIndex(obj => obj._id === sale._id);
    const newSale = JSON.parse(JSON.stringify(this.state.selectedSale));
    if (found > -1) {
      newSale.splice(found, 1);
    } else {
      newSale.push(sale);
    }
    this.setState({ selectedSale: newSale });
  }
  showSaleDetail(sale) {
    this.setState({
      completeSaleModalItem: sale,
    });
    this.props.changePage('/sale/salemodal')
  }
  saleBulkInsert(bulk) {
    loader.on();
    this.props.saleBulkInsertRequest(bulk)
      .then((data) => {
        if (this.props.saleBulkInsert.status === 'SUCCESS') {
          this.props.changePage('/sale');
          this.saleLoad();
          loader.off();
        } else if (this.props.saleBulkInsert.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  saleBulkModify(bulk) {
    loader.on();
    this.props.saleBulkModifyRequest(bulk)
      .then((data) => {
        if (this.props.saleBulkModify.status === 'SUCCESS') {
          this.props.changePage('/sale');
          this.saleLoad();
          loader.off();
        } else if (this.props.saleBulkModify.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  saleBulkRemove() {
    loader.on();
    const bulk = [];
    for (const obj of this.state.selectedSale) {
      bulk.push({
        _id: obj._id,
      });
    }
    this.props.saleBulkRemoveRequest(bulk)
      .then((data) => {
        if (this.props.saleBulkRemove.status === 'SUCCESS') {
          this.props.changePage('/sale');
          this.saleLoad();
          loader.off();
        } else if (this.props.saleBulkRemove.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  selectAll(prop) {
    switch (prop) {
      case 'vintage' :
        const filteredVintageList =
          this.props.vintageGetList.list.filter(v =>
            this.props.saleGetList.list.findIndex(obj => obj.vintage._id === v._id) < 0);
        this.setState({ selectedVintage: filteredVintageList });
        break;
      case 'sale' :
        this.setState({ selectedSale: this.props.saleGetList.list });
        break;
      default:
        this.setState({
          selectedSale: [],
          selectedVintage: [],
        });
        break;
    }
  }
  render() {
    const filteredVintageList =
      this.props.vintageGetList.list.filter(v =>
        this.props.saleGetList.list.findIndex(obj => obj.vintage._id === v._id) < 0);
    let MainView = null;
    switch (this.state.mode) {
      case '상품 리스트':
        MainView = (
          <SaleList
            onlyView
            saleClick={this.saleClick}
            saleRemoveAllClick={() => this.props.changePage('/sale/removeallmodal')}
            saleInsertClick={() => this.props.changePage('/sale/vintage')}
            list={this.props.saleGetList.list}
            refresh={this.saleLoad}
          />
        );
        break;
      case '상품 수정':
        MainView = (
          <SaleList
            onlyView
            fromSaleBulk
            removeSelectedSale={() => this.setState({ selectedSale: [] })}
            completeSelectedSale={() => this.props.changePage('/sale/modifymodal')}
            selectedSale={this.state.selectedSale}
            selectSale={this.selectSale}
            showSaleDetail={this.saleClick}
            selectAll={this.selectAll}
            selectRemove={() => this.props.changePage('/sale/removemodal')}
            list={this.props.saleGetList.list}
            refresh={this.saleLoad}
          />
        );
        break;
      case '상품 생성':
        MainView = (
          <VintageList
            onlyView
            fromSaleBulk
            removeSelectedVintage={() => this.setState({ selectedVintage: [] })}
            completeSelectedVintage={() => this.props.changePage('/sale/insertmodal')}
            selectedVintage={this.state.selectedVintage}
            selectVintage={this.selectVintage}
            selectAll={this.selectAll}
            showVintageDetail={this.showVintageDetail}
            list={filteredVintageList}
            refresh={this.vintageLoad}
          />
        );
        break;
      default:
    }
    return (
      <div>
        <SaleOrVintage
          mode={this.state.mode}
          modeChange={mode => this.setState({ mode })}
        />
        { MainView }
        <Route
          path="/sale/vintagemodal"
          render={props =>
            this.state.completeVintageModalItem ?
              <CompleteVintageModal
                close={() => this.props.changePage('/sale')}
                vintage={this.state.completeVintageModalItem}
                {...props}
              /> : <Redirect to="/sale" />
          }
        />
        <Route
          path="/sale/insertmodal"
          render={props => (
            <VintageListForSale
              onlyView
              account={this.props.accountSession.account}
              list={this.state.selectedVintage}
              refresh={this.vintageLoad}
              insertSale={this.saleBulkInsert}
              close={() => this.props.changePage('/sale')}
              {...props}
            />
          )}
        />
        <Route
          path="/sale/modifymodal"
          render={props => (
            <SaleListForSale
              onlyView
              account={this.props.accountSession.account}
              list={this.state.selectedSale}
              refresh={this.saleLoad}
              modifySale={this.saleBulkModify}
              close={() => this.props.changePage('/sale')}
              {...props}
            />
          )}
        />
        <Route
          path="/sale/modal"
          render={props =>
            this.state.completeSaleModalItem ?
              <CompleteSaleModal
                close={() => this.props.changePage('/sale')}
                sale={this.state.completeSaleModalItem}
                {...props}
              /> : <Redirect to="/sale" />
          }
        />
        <Route
          path="/sale/removeallmodal"
          render={props =>
            <RemoveModal
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="상품이 전부 삭제됩니다. "
              handleRemove={this.saleRemoveAll}
              handleClose={() => this.props.changePage('/sale')}
              {...props}
            />
          }
        />
        <Route
          path="/sale/removemodal"
          render={props =>
            <RemoveModal
              title="주의! 상품을 삭제합니다."
              subtitle="선택한 상품이 전부 삭제됩니다. "
              handleRemove={this.saleBulkRemove}
              handleClose={() => this.props.changePage('/sale')}
              {...props}
            />
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
  saleBulkInsert: {
    status: state.sale.bulkInsert.status,
  },
  saleInsert: {
    status: state.sale.insert.status,
    sale: state.sale.insert.sale,
  },
  saleModify: {
    status: state.sale.modify.status,
  },
  saleBulkModify: {
    status: state.sale.bulkModify.status,
  },
  saleRemove: {
    status: state.sale.remove.status,
  },
  saleRemoveAll: {
    status: state.sale.removeAll.status,
  },
  saleBulkRemove: {
    status: state.sale.bulkRemove.status,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  shopGetListRequest: shop.getListRequest,
  vintageGetListRequest: vintage.getListRequest,
  saleGetListRequest: sale.getListRequest,
  saleInsertRequest: sale.insertRequest,
  saleBulkInsertRequest: sale.bulkInsertRequest,
  saleModifyRequest: sale.modifyRequest,
  saleBulkModifyRequest: sale.bulkModifyRequest,
  saleRemoveRequest: sale.removeRequest,
  saleRemoveAllRequest: sale.removeAllRequest,
  saleBulkRemoveRequest: sale.bulkRemoveRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SaleBulk);
