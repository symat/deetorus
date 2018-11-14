import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "../navbar/navbar";

class App extends React.Component {
  render() {
    const { dispatch, selectedMenu } = this.props;
    return (
      <div className="dt-app">
        <Navbar dispatch={dispatch} selectedMenu={selectedMenu} />

        <div className="App">
          <h1>Hello Guys!</h1>
          <h2>
            Check out the cool menu we have... it propagates the active menu to
            the state!
          </h2>
        </div>
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
