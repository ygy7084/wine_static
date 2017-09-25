import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import {
  customer,
} from '../actions';

import {
  CustomerList,
  CustomerModal,
  CustomerInsertModal,
  RemoveModal,
} from '../components';

import {
  loader,
  errorHandler,
} from '../modules';

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerModalItem: null,
    };
    this.customerLoad = this.customerLoad.bind(this);
    this.customerClick = this.customerClick.bind(this);
    this.customerInsertClick = this.customerInsertClick.bind(this);
    this.customerInsert = this.customerInsert.bind(this);
    this.customerModify = this.customerModify.bind(this);
    this.customerRemove = this.customerRemove.bind(this);
    this.customerRemoveAll = this.customerRemoveAll.bind(this);
  }
  componentWillMount() {
    this.customerLoad();
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
  customerClick(customer) {
    this.setState({
      customerModalItem: customer,
    });
    this.props.changePage('/customer/modal');
  }
  customerInsertClick() {
    this.props.changePage('/customer/insertmodal');
  }
  customerInsert(customer) {
    loader.on();
    this.props.customerInsertRequest(customer)
      .then((data) => {
        if (this.props.customerInsert.status === 'SUCCESS') {
          this.props.changePage('/customer');
          this.customerLoad();
        } else if (this.props.customerInsert.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  customerModify(customer) {
    loader.on();
    this.props.customerModifyRequest(customer)
      .then((data) => {
        if (this.props.customerModify.status === 'SUCCESS') {
          this.props.changePage('/customer');
          this.customerLoad();
        } else if (this.props.customerModify.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  customerRemove(customer) {
    loader.on();
    this.props.customerRemoveRequest(customer)
      .then((data) => {
        if (this.props.customerRemove.status === 'SUCCESS') {
          this.props.changePage('/customer');
          this.customerLoad();
        } else if (this.props.customerRemove.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
      });
  }
  customerRemoveAll() {
    loader.on();
    this.props.customerRemoveAllRequest()
      .then((data) => {
        if (this.props.customerRemoveAll.status === 'SUCCESS') {
          this.props.changePage('/customer');
          this.customerLoad();
        } else if (this.props.customerRemoveAll.status === 'FAILURE') {
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
        <CustomerList
          customerClick={this.customerClick}
          customerInsertClick={this.customerInsertClick}
          list={this.props.customerGetList.list}
          refresh={this.customerLoad}
          customerRemoveAllClick={() => this.props.changePage('/customer/removeallmodal')}
        />
        <Route
          path="/customer/modal"
          render={props =>
            this.state.customerModalItem ?
              <CustomerModal
                close={() => this.props.changePage('/customer')}
                customer={this.state.customerModalItem}
                customerModify={this.customerModify}
                customerRemove={this.customerRemove}
                {...props}
              /> : <Redirect to="/customer" />
          }
        />
        <Route
          path="/customer/insertmodal"
          render={props =>
            (<CustomerInsertModal
              close={() => this.props.changePage('/customer')}
              customerInsert={this.customerInsert}
              {...props}
            />)
          }
        />
        <Route
          path="/customer/removeallmodal"
          render={props =>
            (<RemoveModal
              title="주의! 리스트를 전부 삭제합니다."
              subtitle="고객이 전부 삭제됩니다. 연결된 입출고 내역도 사라집니다."
              handleRemove={this.customerRemoveAll}
              handleClose={() => this.props.changePage('/customer')}
              {...props}
            />)
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  customerGetList: {
    status: state.customer.getList.status,
    list: state.customer.getList.list,
  },
  customerInsert: {
    status: state.customer.insert.status,
    customer: state.customer.insert.customer,
  },
  customerModify: {
    status: state.customer.modify.status,
  },
  customerRemove: {
    status: state.customer.remove.status,
  },
  customerRemoveAll: {
    status: state.customer.removeAll.status,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  customerGetListRequest: customer.getListRequest,
  customerInsertRequest: customer.insertRequest,
  customerModifyRequest: customer.modifyRequest,
  customerRemoveRequest: customer.removeRequest,
  customerRemoveAllRequest: customer.removeAllRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customer);
