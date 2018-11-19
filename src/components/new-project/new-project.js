import React from "react";
import PropTypes from "prop-types";
import { fetchGmlFile } from "../../data-model/data-model-async-actions";
import { changeNavbarMenu } from "../navbar/navbar-actions";

class NewProject extends React.Component {
  constructor(props) {
    super(props);
    this.gmlLoadHandler = this.gmlLoadHandler.bind(this);
  }

  gmlLoadHandler(gmlFilePath) {
    this.props.dispatch(fetchGmlFile(gmlFilePath));
    this.props.dispatch(changeNavbarMenu("visualize"));
  }

  render() {
    return (
      <div className="new-project">
        <h1>Let's create new empty project!</h1>

        <p>Load networks:</p>
        <button onClick={() => this.gmlLoadHandler("data/densitest.gml")}>
          Load densitest
        </button>
        <button onClick={() => this.gmlLoadHandler("data/tree-of-life.gml")}>
          Load densitest
        </button>
      </div>
    );
  }
}

NewProject.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default NewProject;
