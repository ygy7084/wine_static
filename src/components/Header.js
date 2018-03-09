import React from 'react';
import Radium from 'radium';
import IconMenu from 'react-icons/lib/ti/th-menu';
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
const Header = function Header(props) {
  const sideListItems = props.sideListItems;
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
