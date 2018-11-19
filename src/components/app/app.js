import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "../navbar/navbar";
import NewProject from "../new-project/new-project";

class App extends React.Component {
  renderMainScreen() {
    const selectedMenu = this.props.selectedMenu;
    switch (selectedMenu) {
      case "new":
        return <NewProject dispatch={this.props.dispatch} />;

      default:
        return <div>Menu {selectedMenu} not implemented yet.</div>;
    }
  }

  render() {
    const { dispatch, selectedMenu } = this.props;
    return (
      <div className="dt-app">
        <Navbar dispatch={dispatch} selectedMenu={selectedMenu} />

        <div className="dt-main-screen">{this.renderMainScreen()}</div>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedMenu: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    selectedMenu: state.navbar.selectedMenu
  };
}

export default connect(mapStateToProps)(App);
