import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  original,
} from '../actions';

import {
  WineHeader,
  Original,
  OriginalModal,
  ErrorModal,
} from '../components';

import {
  loader,
} from '../modules';

class Wine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemInList: 10,
      findInput: '',
      findMode: '영문 풀네임',
      listMode: '오리지날',
      list: [],
      originalModalToggle: false,
      originalModalItem: null,
      errorMessage: '',
      errorModalToggle: false,
    };
    this.originalLoad = this.originalLoad.bind(this);
    this.handleFindInputChange = this.handleFindInputChange.bind(this);
    this.handleFindModeChange = this.handleFindModeChange.bind(this);
    this.handleFind = this.handleFind.bind(this);
    this.handleItemInListChange = this.handleItemInListChange.bind(this);
    this.handleListModeChange = this.handleListModeChange.bind(this);
    this.handleActivePageSelect = this.handleActivePageSelect.bind(this);
    this.handleWineClick = this.handleWineClick.bind(this);
    this.errorHandle = this.errorHandle.bind(this);
  }
  componentWillMount() {
    this.originalLoad();
  }
  originalLoad() {
    loader.on();
    this.props.originalGetListRequest()
      .then((data) => {
        if (this.props.originalGetList.status === 'SUCCESS') {
          loader.off();
          this.setState({ list: this.props.originalGetList.list });
        } else if (this.props.originalGetList.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        this.errorHandle(data);
      });
  }
  handleFindInputChange(e) {
    this.handleFind(e.target.value);
  }
  // 수정필
  handleFindModeChange(mode) {
    this.setState({
      findMode: mode,
      findInput: '',
      activePage: 1,
      list: this.props.originalGetList.list, // 현재 오리지날만
    });
  }
  // 수정필
  handleFind(input) {
    if (input === '') {
      this.setState({
        findInput: '',
        list: this.props.originalGetList.list,
      });
    } else {
      try {
        const regex = new RegExp(input);
        const found = [];
        let property;
        switch (this.state.findMode) {
          case '영문 풀네임':
            property = 'eng_fullname';
            break;
          case '영문 줄임명':
            property = 'eng_shortname';
            break;
          case '한글 풀네임':
            property = 'kor_fullname';
            break;
          case '한글 줄임명':
            property = 'kor_shortname';
            break;
          default:
            property = 'eng_fullname';
            break;
        }
        for (const obj of this.props.originalGetList.list) {
          if (obj && regex.exec(obj[property])) {
            found.push(obj);
          }
        }
        this.setState({
          list: found,
          findInput: input,
        });
      } catch (e) {
        console.log('정규식 문자는 사용할 수 없습니다.');
        console.log(e);
      }
    }
  }
  handleItemInListChange(number) {
    this.setState({ itemInList: number, activePage: 1 });
  }
  handleListModeChange(mode) {
    if (mode === '오리지날') {
      this.originalLoad();
    }
    this.setState({ listMode: mode, activePage: 1, findMode: '영문 줄임명', findInput: '', });
  }
  handleActivePageSelect(page) {
    this.setState({ activePage: page });
  }
  handleWineClick(original) {
    this.setState({
      originalModalToggle: true,
      originalModalItem: original,
    });
  }
  errorHandle(data) {
    const error = data.error || data;
    if (error.message && error.message !== '') {
      const message = error.message;
      this.setState({
        errorMessage: message,
        errorModalToggle: true,
      });
      throw error.error;
    } else {
      this.setState({
        errorModalToggle: true,
      });
      throw error;
    }
  }
  render() {
    const list = this.state.list.slice(
      (this.state.activePage - 1) * this.state.itemInList,
      this.state.activePage * this.state.itemInList);
    return (
      <div>
        <WineHeader
          handleFindInputChange={this.handleFindInputChange}
          findInput={this.state.findInput}
          handleFindModeChange={this.handleFindModeChange}
          findMode={this.state.findMode}
          itemInList={this.state.itemInList}
          handleItemInListChange={this.handleItemInListChange}
          listMode={this.state.listMode}
          handleListModeChange={this.handleListModeChange}
        />
        <Original
          handleActivePageSelect={this.handleActivePageSelect}
          handleWineClick={this.handleWineClick}
          list={list}
          activePage={this.state.activePage}
          itemInList={this.state.itemInList}
          listMode={this.state.listMode}
        />
        <OriginalModal
          toggle={this.state.originalModalToggle}
          original={this.state.originalModalItem}
          close={() => this.setState({ orignalModalItem: {}, originalModalToggle: false })}
        />
        <ErrorModal
          toggle={this.state.errorModalToggle}
          close={() => this.setState({ errorModalToggle: false })}
          message={this.state.errorMessage}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  originalGetList: {
    status: state.original.getList.status,
    list: state.original.getList.list,
  },
  originalInsert: {
    status: state.original.insert.status,
    original: state.original.insert.original,
  },
  originalModify: {
    status: state.original.modify.status,
  },
  originalRemove: {
    status: state.original.remove.status,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  originalGetListRequest: original.getListRequest,
  originalInsertRequest: original.insertRequest,
  originalModifyRequest: original.modifyRequest,
  originalRemoveRequest: original.removeRequest,
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wine);
