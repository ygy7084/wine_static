import React from 'react';
import PropTypes from 'prop-types';
import {
  TableModal,
  VintageList,
  SaleModal,
} from './';

class SaleInsertModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vintage: undefined,
      saleModalOn: false,
    };
  }
  render() {
    return (
      <div>
        <TableModal
          show={this.props.show}
          title={this.props.title}
          subtitle={this.props.subtitle}
          close={this.props.close}
        >
          <VintageList
            onlyView
            structure={this.props.vintageStructure}
            rowClick={item => this.setState({
              vintage: item,
              saleModalOn: true,
            })}
            list={this.props.vintageList}
          />
        </TableModal>
        <SaleModal
          show={this.state.vintageModalOn}
          title={this.props.title}
          mode="insert"
          vintage={this.state.vintage}
          shopStructure={this.props.shopStructure}
          shopList={this.props.shopList}
          insert={this.props.insert}
          close={() => this.setState({ vintageModalOn: false })}
        />
      </div>
    );
  }
}
SaleInsertModal.propTypes = {
  show: PropTypes.bool,
};
SaleInsertModal.defaultProps = {
  show: true,
};
export default SaleInsertModal;
