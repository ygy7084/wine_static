import React from 'react';
import Radium from 'radium';
import IconAccount from 'react-icons/lib/ti/key';
import IconWine from 'react-icons/lib/ti/wine';
import IconShop from 'react-icons/lib/ti/home-outline';
import IconCustomer from 'react-icons/lib/ti/user';
import IconCustomerBase from 'react-icons/lib/go/key';
import IconStore from 'react-icons/lib/ti/arrow-repeat-outline';
import IconMenu from 'react-icons/lib/ti/th-menu';
import IconSale from 'react-icons/lib/md/list';
import IconStoreIn from 'react-icons/lib/ti/arrow-left-outline';
import IconStoreOut from 'react-icons/lib/ti/arrow-right-outline';
import IconConfiguration from 'react-icons/lib/md/settings';
import {
  Route,
} from 'react-router-dom';

/*
Link should be overridden to be styled by Radium
https://github.com/FormidableLabs/radium/tree/master/docs/faq
 */

const style = {
  topBar: {
    position: 'fixed',
    width: '100%',
    height: '55px',
    zIndex: '1000',
    display: 'block',
    background: 'white',
    fontSize: '3rem',
    borderBottom: '1px solid #cfd8dc',
  },
  topBarMenu: {
    position: 'absolute',
    marginTop: '10px',
    marginLeft: '15px',
  },
  topBarMenuWrapper: {
    ':hover': {
      cursor: 'pointer',
    },
  },
  topBarImage: {
    display: 'block',
    textAlign: 'center',
  },
  image: {
    paddingTop: '7px',
    height: '40px',
  },
  sideBar: {
    base: {
      position: 'fixed',
      width: '200px',
      height: '100%',
      top: '55px',
      zIndex: '1000',
      display: 'block',
      color: 'white',
      background: '#263238',
      overflowY: 'auto',
    },
    close: {
      left: '-200px',
    },
  },
  sideList: {
    listStyle: 'none',
    paddingLeft: '0',
  },
  sideListItem_li: {
    base: {
      ':hover': {
        background: '#20a8d8',
        cursor: 'pointer',
      },
      ':focus': {
        outline: '0',
      },
    },
    selected: {
      background: '#405057',
    },
  },
  sideListItem: {
    display: 'block',
    paddingTop: '12px',
    paddingBottom: '12px',
    paddingLeft: '16px',
    textDecoration: 'none',
    color: 'white',
    ':focus': {
      outline: '0',
    },
    fontSize: '1.5rem',
  },
  sideListItemIcon: {
    fontSize: '26px',
    marginRight: '16px',
  },
  loginStatus: {
    textAlign: 'center',
    marginTop: '30px',
  },
  logout: {
    ':hover': {
      cursor: 'pointer',
    },
  },
};
const sideListItems = [
  { name: '계정',
    path: '/account',
    icon: IconAccount,
    authority: ['관리자'] },
  { name: '와인',
    path: '/wine',
    icon: IconWine,
    authority: ['관리자'] },
  { name: '상품',
    path: '/sale',
    icon: IconSale,
    authority: ['매장'] },
  { name: '매장',
    path: '/shop',
    icon: IconShop,
    authority: ['관리자', '매장'] },
  { name: '고객',
    path: '/customer',
    icon: IconCustomer,
    authority: ['관리자', '매장'] },
  { name: '고객 계정',
    path: '/customerbase',
    icon: IconCustomerBase,
    authority: ['관리자'] },
  { name: '입고',
    path: '/storein',
    icon: IconStoreIn,
    authority: ['관리자', '매장'] },
  { name: '출고',
    path: '/storeout',
    icon: IconStoreOut,
    authority: ['관리자', '매장'] },
  { name: '입출고 내역',
    path: '/store',
    icon: IconStore,
    authority: ['관리자', '매장'] },
  { name: '설정',
    path: '/configuration',
    icon: IconConfiguration,
    authority: ['관리자']},
];
const Header = function Header(props) {
  const sideBarStyle = [style.sideBar.base];
  if (props.menuClose) {
    sideBarStyle.push(style.sideBar.close);
  }
  const loginStatus = {
    username: '',
    name: '',
    level: '',
  };
  if (props.account) {
    loginStatus.username = props.account.username;
    loginStatus.name = props.account.name;
    loginStatus.level = props.account.level;
  }
  return (
    <div>
      <div style={style.topBar}>
        <div style={style.topBarMenuWrapper}>
          <IconMenu
            style={style.topBarMenu}
            onClick={props.toggleMenu}
          />
        </div>
        <div style={style.topBarImage}>
          <img style={style.image} src="/img/wine.png" alt="WINE" />
        </div>
      </div>
      <nav style={sideBarStyle}>
        <ul style={style.sideList}>
          {sideListItems.map((item) => {
            if (item.authority.find(obj => obj === loginStatus.level)) {
              return (
                <Route
                  key={item.name}
                  path={item.path}
                  children={routeProps => (
                    <li
                      key={item.name + item.path}
                      style={routeProps.match ?
                        [style.sideListItem_li.base, style.sideListItem_li.selected]
                        : style.sideListItem_li.base}
                    >
                      <a
                        key={item.path}
                        style={style.sideListItem}
                        onClick={() => { props.menuClick(item.path); }}
                        role="button"
                        tabIndex={0}
                      >
                        <item.icon style={style.sideListItemIcon} />
                        {item.name}
                      </a>
                    </li>
                  )}
                />
              );
            }
            return null;
          })}
        </ul>
        <div style={style.loginStatus}>
          <h4>접속 정보</h4>
          <p>{`ID : ${loginStatus.username}`}</p>
          <p>{`이름 : ${loginStatus.name}`}</p>
          <p>{`권한 : ${loginStatus.level}`}</p>
          <a
            key="logout"
            style={style.logout}
            onClick={props.logout}
            role="button"
            tabIndex={0}
          ><b>로그아웃</b></a>
        </div>
      </nav>
    </div>
  );
};

export default Radium(Header);
