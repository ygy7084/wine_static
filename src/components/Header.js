
import React from 'react';
import Radium from 'radium';
import IconWine from 'react-icons/lib/ti/wine';
import IconShop from 'react-icons/lib/ti/home-outline';
import IconCustomer from 'react-icons/lib/ti/user';
import IconStore from 'react-icons/lib/ti/document-text';
import IconMenu from 'react-icons/lib/ti/th-menu';
import {
  Link,
} from 'react-router-dom';

/*
Link should be overridden to be styled by Radium
https://github.com/FormidableLabs/radium/tree/master/docs/faq
 */
const LinkRadium = Radium(Link);

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
};
const sideListItems = [
  { name: '와인',
    link: '/main/wine',
    icon: IconWine },
  { name: '매장',
    link: '/main/shop',
    icon: IconShop },
  { name: '고객',
    link: '/main/customer',
    icon: IconCustomer },
  { name: '입출고',
    link: '/main/store',
    icon: IconStore }];
class Header extends React.Component {
  constructor(props) {
    super(props);

    const selected = sideListItems.findIndex(item =>
      props.location.pathname === item.link,
    );
    this.state = {
      selected: selected < 0 ? 0 : selected,
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleItemClick(index) {
    this.setState({
      selected: index,
    });
  }
  render() {
    const sideBarStyle = [style.sideBar.base];
    if (this.props.menuClose) {
      sideBarStyle.push(style.sideBar.close);
    }
    return (
      <div>
        <div style={style.topBar}>
          <div style={style.topBarMenuWrapper}>
            <IconMenu
              style={style.topBarMenu}
              onClick={this.props.toggleMenu}
            />
          </div>
          <div style={style.topBarImage}>
            <img style={style.image} src="/img/wine.png" alt="WINE" />
          </div>
        </div>
        <nav style={sideBarStyle}>
          <ul style={style.sideList}>
            {sideListItems.map((item, i) => {
              const itemStyle = [style.sideListItem_li.base];
              if (this.state.selected === i) {
                itemStyle.push(style.sideListItem_li.selected);
              }

              return (
                <li key={item.name} style={itemStyle}>
                  <LinkRadium
                    to={item.link}
                    key={`${item.name}link`}
                    style={style.sideListItem}
                    onClick={() => { this.handleItemClick(i); }}
                    role="button"
                    tabIndex={0}
                  >
                    <item.icon style={style.sideListItemIcon} />
                    {item.name}
                  </LinkRadium>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }
};

export default Radium(Header);

