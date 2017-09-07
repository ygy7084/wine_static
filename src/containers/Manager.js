import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { member, history } from '../actions';

import {
  MemberList,
  MemberWrapper,
  MemberModal,
  ErrorModal,
} from '../components';

import {
  loader
} from '../modules';

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberList: [],
      MemberModal_show: false,
      MemberModal_member: '',
      ErrorMessage: '',
      ErrorModal_show: false,
    };
    this.errorHandle = this.errorHandle.bind(this);
    this.listLoad = this.listLoad.bind(this);
    this.memberClick = this.memberClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePointUsage = this.handlePointUsage.bind(this);
    this.getHistoryList = this.getHistoryList.bind(this);
  }
  componentWillMount() {
    this.listLoad();
  }
  componentWillReceiveProps(nextProps){
    const asyncs = [
      'memberListload',
      'memberDelete',
      'memberEdit',
      'pointUse',
      'historyListload'];

    for (const async of asyncs) {
      if (nextProps[async].status === 'WAITING') {
        console.log('on');
        return loader.on();
      }
    }
    console.log('off');
    return loader.off();
  }
  errorHandle(data) {
    const error = data.error || data;
    if (error.message && error.message !== '') {
      const message = error.message;
      console.log(error.message);
      this.setState({
        ErrorMessage: message,
        ErrorModal_show: true,
      });
      throw error.error;
    } else {
      this.setState({
        ErrorModal_show: true,
      });
      console.log(error);
      throw error;
    }
  }
  listLoad() {
    return this.props.memberListloadRequest()
      .then((data) => {
        if (this.props.memberListload.status === 'SUCCESS') {
          this.setState({
            memberList: this.props.memberListload.list,
            MemberModal_show: false,
          });
        } else if (this.props.memberListload.status === 'FAILURE') {
          console.log(this.props.memberListload);
          throw data;
        }
      })
      .catch((data) => {
        this.errorHandle(data);
      });
  }
  memberClick(member) {
    this.setState({
      MemberModal_show: true,
      MemberModal_member: member,
    });
  }
  handleEdit(member) {
    return this.props.memberEditRequest(member)
      .then((data) => {
        if (this.props.memberEdit.status === 'SUCCESS') {
          this.listLoad();
        } else if (this.props.memberEdit.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        this.errorHandle(data);
      });
  }
  handleDelete() {
    return this.props.memberDeleteRequest(this.state.MemberModal_member.phone)
      .then((data) => {
        if (this.props.memberDelete.status === 'SUCCESS') {
          this.listLoad();
          this.setState({
            MemberModal_show: false,
          });
        } else if (this.props.memberDelete.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        this.errorHandle(data);
      });
  }
  handlePointUsage(request) {
    this.setState({ MemberModal_show: false });
    return this.props.pointUseRequest(request)
      .then((data) => {
        if (this.props.pointUse.status === 'SUCCESS') {
          this.listLoad();
        } else if (this.props.pointUse.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        this.errorHandle(data);
      });
  }
  getHistoryList(phone) {
    return this.props.historyListloadRequest(phone)
      .then((data) => {
        if (this.props.historyListload.status === 'SUCCESS') {
          return null;
        } else if (this.props.historyListload.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        this.errorHandle(data);
      });
  }
  render() {
    return (
      <div>
        <MemberWrapper>
          <MemberList
            list={this.state.memberList}
            memberClick={this.memberClick}
          />
        </MemberWrapper>
        <MemberModal
          show={this.state.MemberModal_show}
          member={this.state.MemberModal_member}
          save={this.handleEdit}
          delete={this.handleDelete}
          pointUsage={this.handlePointUsage}
          close={() => { this.setState({ MemberModal_show: false }); }}
          getHistoryList={this.getHistoryList}
          historyList={this.props.historyListload.list}
        />
        <ErrorModal
          message={this.state.ErrorMessage}
          close={() => { this.setState({ ErrorModal_show: false }); }}
          show={this.state.ErrorModal_show}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  memberListload: {
    status: state.member.memberListload.status,
    list: state.member.memberListload.list,
  },
  memberEdit: {
    status: state.member.memberEdit.status,
  },
  memberDelete: {
    status: state.member.memberDelete.status,
  },
  pointUse: {
    status: state.member.pointUse.status,
    newPoint: state.member.pointUse.list,
  },
  historyListload: {
    status: state.history.historyListload.status,
    list: state.history.historyListload.list,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  memberListloadRequest: member.memberListloadRequest,
  memberEditRequest: member.memberEditRequest,
  memberDeleteRequest: member.memberDeleteRequest,
  pointUseRequest: member.pointUseRequest,
  historyListloadRequest: history.historyListloadRequest,
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Manager);
