import React from 'react';
import Radium, { StyleRoot } from 'radium';
import PropTypes from 'prop-types';
import {
  InputGroup,
  DropdownButton,
  MenuItem,
  FormControl,
  Form,
} from 'react-bootstrap';

const InputGroupRadium = Radium(InputGroup);
const styles = {
  dropdown: {
    borderRadius: '0px',
  },
  rightButtons: {
    width: '200px',
    float: 'right',
    '@media screen and (max-width: 700px)': {
      width: '100%',
    },
  },
};
export default class KYFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: this.props.filters[0],
      input: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onInputChange(e) {
    this.setState({ input: e.target.value });
  }
  onFilterChange(value) {
    this.setState({ filter: value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.submit ? this.props.submit({
      filter: this.state.filter,
      input: this.state.input,
    }) : null;
  }
  render() {
    return (
      <StyleRoot>
        <InputGroupRadium style={styles.rightButtons}>
          <DropdownButton
            id={'dropdownFinder'}
            style={styles.dropdown}
            componentClass={InputGroup.Button}
            onSelect={this.onFilterChange}
            title={this.state.filter}
          >
            {
              this.props.filters.map(filter => (
                <MenuItem
                  key={filter}
                  eventKey={filter}
                  active={filter === this.state.filter}
                >{filter}</MenuItem>
              ))
            }
          </DropdownButton>
          <Form
            onSubmit={this.onSubmit}
          >
            <FormControl
              type="text"
              value={this.state.input}
              onChange={this.onInputChange}
            />
          </Form>
        </InputGroupRadium>
      </StyleRoot>
    );
  }
}
KYFinder.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  submit: PropTypes.func,
};
KYFinder.defaultProps = {
  submit: undefined,
};
