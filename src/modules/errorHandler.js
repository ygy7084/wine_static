import { push } from 'react-router-redux';
import store from '../store';
import {
  account,
} from '../actions';
import {
  turnOnSimpleMessage,
} from '../components';

export default function (data) {
  console.log(data);
  const error = data.error || data;
  if (error.message && error.message !== '') {
    if (error.message === 'Failed to fetch') {
      turnOnSimpleMessage.error('서버에 연결할 수 없습니다.');
    } else {
      turnOnSimpleMessage.error(error.message ? error.message : '알수없는에러');
      switch (error.behavior) {
        case 'redirectToLogin':
          store.dispatch(account.sessionRequest())
            .then(() => store.dispatch(() => push('/')));
          break;
        default:
          break;
      }
    }
  } else {
    console.log(error);
    turnOnSimpleMessage.error(`에러가 있습니다. ${JSON.stringify(error)}`);
  }
}
