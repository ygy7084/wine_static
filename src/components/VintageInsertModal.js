import React from 'react';
import PropTypes from 'prop-types';
import {
  TableModal,
  OriginalList,
  VintageModal,
} from './';

class VintageInsertModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      original: undefined,
      vintageModalOn: false,
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
          <OriginalList
            onlyView
            structure={this.props.originalStructure}
            rowClick={item => this.setState({
              original: item,
              vintageModalOn: true,
            })}
            list={this.props.originalList}
          />
        </TableModal>
        <VintageModal
          title={this.props.title}
          show={this.state.vintageModalOn}
          mode="insert"
          original={this.state.original}
          close={() => this.setState({ vintageModalOn: false })}
          insert={this.props.insert}
        />
      </div>
    );
  }
}
VintageInsertModal.propTypes = {
  show: PropTypes.bool,
};
VintageInsertModal.defaultProps = {
  show: true,
};
export default VintageInsertModal;
