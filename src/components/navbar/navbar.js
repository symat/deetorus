import React from "react";
import PropTypes from "prop-types";
import { changeNavbarMenu } from "./navbar-actions";

class Navbar extends React.Component {
  onMenuClick(menuId) {
    this.props.dispatch(changeNavbarMenu(menuId));
  }

  renderMenuLink(name, id, selectedId) {
    const isActive = id === selectedId ? " active" : "";
    return (
      <li className={"nav-item" + isActive}>
        <a className="nav-link" href="#" onClick={() => this.onMenuClick(id)}>
          {name}
        </a>
      </li>
    );
  }

  render() {
    const selectedMenuId = this.props.selectedMenu;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          DeeTorus
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {this.renderMenuLink("AA", "aa", selectedMenuId)}
            {this.renderMenuLink("BB", "bb", selectedMenuId)}
            {this.renderMenuLink("CC", "cc", selectedMenuId)}
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedMenu: PropTypes.string.isRequired
};

export default Navbar;
