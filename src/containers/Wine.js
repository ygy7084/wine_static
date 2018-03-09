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
    const { match } = this.props;
    switch (value) {
      case '오리지날' :
        this.props.changePage(`${match.url}/original`);
        break;
      case '빈티지' :
        this.props.changePage(`${match.url}/vintage`);
        break;
      case '상품' :
        this.props.changePage(`${match.url}/sale`);
        break;
      case '품종 관리' :
        this.props.changePage(`${match.url}/grape`);
        break;
      case '원산지 관리' :
        this.props.changePage(`${match.url}/location`);
        break;
      default:
    }
  }
  render() {
    const { match } = this.props;
    console.log(match.url);
    return (
      <div>
        <Route
          path={`${match.url}/:selected`}
          render={props =>
            <WineHeader
              modeChange={this.modeChange}
              {...props}
            />}
        />
        <Switch>
          <Route exact path={`${match.url}`} render={() => <Redirect to={`${match.url}/original`} />} />
          <Route path={`${match.url}/original`} component={Original} />
          <Route path={`${match.url}/vintage`} component={Vintage} />
          <Route path={`${match.url}/sale`} component={Sale} />
          <Route path={`${match.url}/grape`} component={Grape} />
          <Route path={`${match.url}/location`} component={Location} />
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
