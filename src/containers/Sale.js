import React from 'react';
import fileDownload from 'react-file-download';
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
  excel,
} from '../actions';
import {
  SaleList,
  SaleModal,
  SaleInsertModal,
  CheckModal,
} from '../components';
import {
  loader,
  errorHandler,
} from '../modules';
import structures from './structures';

class Sale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saleModalItem: null,
    };
    this.shopLoad = this.shopLoad.bind(this);
    this.vintageLoad = this.vintageLoad.bind(this);
    this.saleLoad = this.saleLoad.bind(this);
    this.saleClick = this.saleClick.bind(this);
    this.saleInsert = this.saleInsert.bind(this);
    this.saleModify = this.saleModify.bind(this);
    this.saleRemove = this.saleRemove.bind(this);
    this.saleRemoveAll = this.saleRemoveAll.bind(this);
    this.tableToExcel = this.tableToExcel.bind(this);
  }
  componentWillMount() {
    this.saleLoad();
    this.vintageLoad();
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
  saleInsert(sale) {
    loader.on();
    this.props.saleInsertRequest(sale)
      .then((data) => {
        if (this.props.saleInsert.status === 'SUCCESS') {
          loader.off();
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
          loader.off();
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
          loader.off();
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
          loader.off();
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
  tableToExcel(table) {
    loader.on();
    this.props.excelTableToExcelReqeust(table)
      .then((data) => {
        if (this.props.excelTableToExcel.status === 'SUCCESS') {
          loader.off();
          fileDownload(this.props.excelTableToExcel.file, 'data.xlsx');
        } else {
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
          list={this.props.saleGetList.list}
          structure={structures.sale}
          rowClick={this.saleClick}
          removeAllClick={() => this.props.changePage('/wine/sale/removeallmodal')}
          insertClick={() => this.props.changePage('/wine/sale/insert')}
          refresh={this.saleLoad}
          tableToExcel={this.tableToExcel}
        />
        <Route
          path="/wine/sale/modal"
          render={props =>
            this.state.saleModalItem ?
              <SaleModal
                imageView
                title="상품 정보"
                mode="modify"
                item={this.state.saleModalItem}
                modify={this.saleModify}
                remove={this.saleRemove}
                shopList={this.props.shopGetList.list}
                shopStructure={structures.shop}
                close={() => this.props.changePage('/wine/sale')}
              /> : <Redirect to="/wine/sale" />
          }
        />
        <Route
          path="/wine/sale/insert"
          render={props => (
            <SaleInsertModal
              title="상품 추가"
              subtitle="상품을 추가 할 빈티지를 선택하십시요."
              vintageStructure={structures.vintage}
              vintageList={this.props.vintageGetList.list}
              shopStructure={structures.shop}
              shopList={this.props.shopGetList.list}
              insert={this.saleInsert}
              close={() => this.props.changePage('/wine/sale')}
            />
          )}
        />
        <Route
          path="/wine/sale/removeallmodal"
          render={props =>
            <CheckModal
              bsStyle="danger"
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="상품이 전부 삭제됩니다. "
              handleCheck={this.saleRemoveAll}
              handleClose={() => this.props.changePage('/wine/sale')}
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
  excelTableToExcel: {
    status: state.excel.tableToExcel.status,
    file: state.excel.tableToExcel.file,
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
  excelTableToExcelReqeust: excel.tableToExcelRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sale);
