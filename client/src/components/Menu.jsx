import React from 'react';
import SearchBar from './SearchBar.jsx';
import MenuButtonContainer from './MenuButtonContainer.jsx';
import MenuContainer from './MenuContainer.jsx';
import axios from 'axios';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      menuItems: [],
      restaurantId: 1,
      currentMenu: 0,
      restaurantLoaded: false
    };
  }

  componentDidMount() {
    const splitUrl = window.location.pathname.split('/');
    const rId = parseInt(splitUrl[2]);
    this.setState(
      {
        restaurantId: rId
      },
      this.getMenus
    );
  }

  getMenus() {
    axios
      .get(`/api/restaurants/${this.state.restaurantId}/menus`)
      .then(response => {
        this.setState({
          restaurantLoaded: true,
          menus: response.data
        });
        this.getMenuItems(response.data[0]);
      })
      .catch(err => console.log(err));
  }

  getMenuItems(menu) {
    axios
      .get(`/api/restaurants/${this.state.restaurantId}/menus/${menu}`)
      .then(response => {
        const menuIndex = this.state.menus.indexOf(menu);
        this.setState({
          menuItems: response.data,
          currentMenu: menuIndex
        });
      })
      .catch(err => console.log(err));
  }

  search(e) {
    this.setState(
      {
        restaurantId: e.target.value
      },
      () => {
        if (e.target.value && e.target.value <= 100 && e.target.value > 0) {
          this.getMenus();
        }
      }
    );
  }

  render() {
    const styles = {
      base: {
        fontFamily:
          'Brandon-Bold, Lato,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
        fontSize: '24px',
        fontWeight: '500',
        lineHeight: '32px',
        color: '#2d333f',
        borderBottom: '1px solid #d8d9db',
        paddingBottom: '16px',
        margin: '0 0 0 0',
        display: 'flex',
        justifyContent: 'space-between'
      }
    };
    return (
      <div
        id="menu"
        style={{ width: '640px', marginLeft: 'auto', marginRight: 'auto' }}
      >
        <h2 style={styles.base}>Menu</h2>
        {this.state.restaurantLoaded && (
          <MenuButtonContainer
            key={2}
            menus={this.state.menus}
            clickMenu={this.getMenuItems.bind(this)}
            currentMenu={this.state.menus[this.state.currentMenu]}
          />
        )}
        {this.state.restaurantLoaded && (
          <MenuContainer key={3} items={this.state.menuItems} />
        )}
      </div>
    );
  }
}

export default Menu;
