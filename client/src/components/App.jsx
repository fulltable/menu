import React from 'react';
import SearchBar from './SearchBar.jsx';
import MenuButtonContainer from './MenuButtonContainer.jsx';
import MenuContainer from './MenuContainer.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      menus: [],
      menuItems: [{}],
      restaurantId: 1,
      currentMenu: 0,
      restaurantLoaded: false,
    }
  }

  componentDidMount() {
    this.getMenus();
  }
  
  getMenus() {
    fetch(`/api/restaurants/${this.state.restaurantId}/menus`)
    .then(response => {
      return response.json();
    })
    .then(menus => {
      this.setState({
        restaurantLoaded: true,
        menus: menus
      });
      this.getMenuItems(menus[0]);
    }).catch(err => console.log(err));
  }

  getMenuItems(menu) {
    fetch(`/api/restaurants/${this.state.restaurantId}/menus/${menu}`)
    .then(response => {
      return response.json();
    })
    .then(items => {
      const menuIndex = this.state.menus.indexOf(menu);
      this.setState({
        menuItems: items,
        currentMenu: menuIndex,
      });
    }).catch(err => console.log(err));
  }

  search(e) {
    console.log('searching: ', e.target.value);
    this.setState({
      restaurantId: e.target.value,
    }, () => {
      if (e.target.value && e.target.value <= 100 && e.target.value > 0) {
        this.getMenus();
      }
    });
  }

  render() {
    const styles = {
      base: {
        fontFamily: 'Brandon-Bold, Lato,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
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
    }
    return (
      <div id="menu">
        <SearchBar updateSearchText={this.search.bind(this)}/>
        <h2 style={styles.base}>Menu</h2>
        {this.state.restaurantLoaded && (<MenuButtonContainer menus={this.state.menus} clickMenu={this.getMenuItems.bind(this)} currentMenu={this.state.menus[this.state.currentMenu]}/>)}
        {this.state.restaurantLoaded && (<MenuContainer items={this.state.menuItems}/>)}
      </div>
    );
  }
};

export default App;