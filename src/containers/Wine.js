import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux';

import {
  Original,
  Vintage,
  Sale,
  Grape,
  Location,
} from './';

import {
  Page404,
  WineHeader,
} from '../components';


class Wine extends React.Component {
  constructor(props) {
    super(props);
    this.modeChange = this.modeChange.bind(this);
  }
  modeChange(value) {
    switch (value) {
      case '오리지날' :
        this.props.changePage('/wine/original');
        break;
      case '빈티지' :
        this.props.changePage('/wine/vintage');
        break;
      case '상품' :
        this.props.changePage('/wine/sale');
        break;
      case '품종 관리' :
        this.props.changePage('/wine/grape');
        break;
      case '원산지 관리' :
        this.props.changePage('/wine/location');
        break;
      default:
    }
  }
  render() {
    return (
      <div>
        <Route
          path="/wine/:selected"
          render={props =>
            <WineHeader
              modeChange={this.modeChange}
              {...props}
            />}
        />
        <Switch>
          <Route exact path="/wine" render={() => <Redirect to="/wine/original" />} />
          <Route path="/wine/original" component={Original} />
          <Route path="/wine/vintage" component={Vintage} />
          <Route path="/wine/sale" component={Sale} />
          <Route path="/wine/grape" component={Grape} />
          <Route path="/wine/location" component={Location} />
          <Route component={Page404} />
        </Switch>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);
export default connect(
  null,
  mapDispatchToProps,
)(Wine);
