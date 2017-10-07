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
  SaleList,
  SaleModal,
  VintageModal,
  SaleHeaderForShop,
  CheckModal,
  SaleListForSelect,
  VintageListForSelect,
  SaleInsertModalForShop,
  SaleModalForShop,
} from '../components';
import {
  loader,
  errorHandler,
} from '../modules';
import structures from './structures';

class SaleForShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: '상품 리스트',
      saleModalItem: null,
      vintageModalItem: null,
      selectedVintages: [],
      selectedItems: [],
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
    this.vintageSelect = this.vintageSelect.bind(this);
    this.saleSelect = this.saleSelect.bind(this);
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
            selectedVintages: [],
            selectedItems: [],
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
            selectedVintages: [],
            selectedItems: [],
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
      saleModalItem: sale,
    });
    this.props.changePage('/sale/modal');
  }
  vintageClick(vintage) {
    this.setState({
      vintageModalItem: vintage,
    });
    this.props.changePage('/sale/vintagemodal');
  }
  saleInsert(sale) {
    loader.on();
    this.props.saleInsertRequest(sale)
      .then((data) => {
        if (this.props.handleInsert.status === 'SUCCESS') {
          this.props.changePage('/sale');
          this.saleLoad();
          loader.off();
        } else if (this.props.handleInsert.status === 'FAILURE') {
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
        if (this.props.handleModify.status === 'SUCCESS') {
          loader.off();
          this.props.changePage('/sale');
          this.saleLoad();
        } else if (this.props.handleModify.status === 'FAILURE') {
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
        if (this.props.handleRemove.status === 'SUCCESS') {
          loader.off();
          this.props.changePage('/sale');
          this.saleLoad();
        } else if (this.props.handleRemove.status === 'FAILURE') {
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
          loader.off();
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
  vintageSelect(vintage) {
    const found = this.state.selectedVintages.findIndex(obj => obj._id === vintage._id);
    const newVintage = JSON.parse(JSON.stringify(this.state.selectedVintages));
    if (found > -1) {
      newVintage.splice(found, 1);
    } else {
      newVintage.push(vintage);
    }
    this.setState({ selectedVintages: newVintage });
  }
  saleSelect(sale) {
    const found = this.state.selectedItems.findIndex(obj => obj._id === sale._id);
    const newSale = JSON.parse(JSON.stringify(this.state.selectedItems));
    if (found > -1) {
      newSale.splice(found, 1);
    } else {
      newSale.push(sale);
    }
    this.setState({ selectedItems: newSale });
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
    for (const obj of this.state.selectedItems) {
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
        this.setState({ selectedVintages: filteredVintageList });
        break;
      case 'sale' :
        this.setState({ selectedItems: this.props.saleGetList.list });
        break;
      default:
        this.setState({
          selectedItems: [],
          selectedVintages: [],
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
            list={this.props.saleGetList.list}
            structure={structures.sale}
            rowClick={this.saleClick}
            removeAllClick={() => this.props.changePage('/sale/removeallmodal')}
            insertClick={() => this.props.changePage('/sale/vintage')}
            refresh={this.saleLoad}
            outputTable={e => console.log(e)}
          />
        );
        break;
      case '상품 수정':
        MainView = (
          <SaleListForSelect
            list={this.props.saleGetList.list}
            selectedItems={this.state.selectedItems}
            rowClick={this.saleClick}
            rowSelect={this.saleSelect}
            outputTable={e => console.log(e)}
            structure={structures.sale}
            refresh={this.saleLoad}
            modifyClick={() => this.props.changePage('/sale/modifymodal')}
            removeClick={() => this.props.changePage('/sale/removemodal')}
            cancelSelected={() => this.setState({ selectedItems: [] })}
            selectAll={() => this.selectAll('sale')}
          />
        );
        break;
      case '상품 생성':
        MainView = (
          <VintageListForSelect
            list={filteredVintageList}
            selectedItems={this.state.selectedVintages}
            rowClick={this.vintageClick}
            rowSelect={this.vintageSelect}
            outputTable={e => console.log(e)}
            structure={structures.vintage}
            refresh={this.vintageLoad}
            insertClick={() => this.props.changePage('/sale/insertmodal')}
            cancelSelected={() => this.setState({ selectedVintages: [] })}
            selectAll={() => this.selectAll('vintage')}
          />
        );
        break;
      default:
    }
    return (
      <div>
        <SaleHeaderForShop
          mode={this.state.mode}
          modeChange={mode => this.setState({ mode })}
        />
        { MainView }
        <Route
          path="/sale/vintagemodal"
          render={props =>
            this.state.vintageModalItem ?
              <VintageModal
                onlyView
                imageView
                mode="modify"
                close={() => this.props.changePage('/sale')}
                item={this.state.vintageModalItem}
              /> : <Redirect to="/sale" />
          }
        />
        <Route
          path="/sale/modal"
          render={props =>
            this.state.saleModalItem ?
              <SaleModal
                onlyView
                imageView
                mode="modify"
                close={() => this.props.changePage('/sale')}
                item={this.state.saleModalItem}
              /> : <Redirect to="/sale" />
          }
        />
        <Route
          path="/sale/insertmodal"
          render={props =>
            this.props.accountSession.account ?
              <SaleInsertModalForShop
                title={'상품 정보 입력'}
                subtitle={'상품 추가를 위해 빈티지의 정보를 입력해주십시요.'}
                mode="insert"
                vintageList={this.state.selectedVintages}
                structure={structures.sale}
                shop={this.props.accountSession.account.shop}
                insert={this.saleBulkInsert}
                close={() => this.props.changePage('/sale')}
              /> : <Redirect to="/sale" />
          }
        />
        <Route
          path="/sale/modifymodal"
          render={props =>
            this.props.accountSession.account ?
              <SaleModalForShop
                title={'상품 정보 입력'}
                subtitle={'상품 추가를 위해 빈티지의 정보를 입력해주십시요.'}
                mode="modify"
                list={this.state.selectedItems}
                structure={structures.sale}
                shop={this.props.accountSession.account.shop}
                modify={this.saleBulkModify}
                close={() => this.props.changePage('/sale')}
              /> : <Redirect to="/sale" />
          }
        />
        <Route
          path="/sale/removeallmodal"
          render={props =>
            <CheckModal
              bsStyle="danger"
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="상품이 전부 삭제됩니다. "
              handleCheck={this.saleRemoveAll}
              handleClose={() => this.props.changePage('/sale')}
            />
          }
        />
        <Route
          path="/sale/removemodal"
          render={props =>
            <CheckModal
              bsStyle="danger"
              title="주의! 상품을 삭제합니다."
              subtitle="선택한 상품이 전부 삭제됩니다. "
              handleCheck={this.saleBulkRemove}
              handleClose={() => this.props.changePage('/sale')}
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
)(SaleForShop);
