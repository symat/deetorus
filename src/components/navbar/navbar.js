import React from "react";
import PropTypes from "prop-types";
import { changeNavbarMenu } from "./navbar-actions";
import { Menu, Icon } from 'semantic-ui-react'

class Navbar extends React.Component {
  
  constructor(props) {
    super(props);
    this.onMenuClick = this.onMenuClick.bind(this);
  }

  onMenuClick(e, {name} ) {
    this.props.dispatch(changeNavbarMenu(name));
  }

  render() {
    const selectedMenuId = this.props.selectedMenu;
    return (
      <Menu stackable>
        <Menu.Item onClick={e => this.props.dispatch(changeNavbarMenu("new"))}>
          <Icon name="gem outline"  color='teal'   size='large' />
          DeeTorus 
        </Menu.Item>

        <Menu.Item name='new' active={selectedMenuId === 'new'} onClick={this.onMenuClick}>
          New Project
        </Menu.Item>

        <Menu.Item name='visualize' active={selectedMenuId === 'visualize'} onClick={this.onMenuClick}>
          Visualize
        </Menu.Item>

        <Menu.Item name='transformations' active={selectedMenuId === 'transformations'} onClick={this.onMenuClick}>
          Transformations
        </Menu.Item>

      </Menu>
    );
  }
}

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedMenu: PropTypes.string.isRequired
};

export default Navbar;
