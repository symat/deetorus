import React from "react";
import PropTypes from "prop-types";
import {ForceGraph3D} from 'react-force-graph';
import { scaleGraph } from "../../utils";
import min from "ramda/es/min";


class Graph3D extends React.Component {

  convertDataFormat(dataModel) {
    let scaledNodes = scaleGraph(dataModel.nodes, min(this.props.height, this.props.width));
    let graphData = {
      nodes : [],
      links : []
    }
    for(let n of scaledNodes) {
      let node = {id: n.id};
      if('graphics' in n) {
        if('x' in n.graphics) {
          node.fx = n.graphics.x;
          node.x = n.graphics.x;
        }
        if('y' in n.graphics) {
          node.fy = n.graphics.y;
          node.y = n.graphics.y;
        }
        if('z' in n.graphics) {
          node.fz = n.graphics.z;
          node.z = n.graphics.z;
        }
      }
      graphData.nodes.push(node);
    }
    for(let l of dataModel.links) {
      let link = {source: l.source, target: l.target};
      graphData.links.push(link);
    }
    return graphData;
  }

  render() {
    return (
      <ForceGraph3D
        graphData={this.convertDataFormat(this.props.dataModel)}
        height = {this.props.height}
        width = {this.props.width}
    />
      );
  }
}

Graph3D.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dataModel: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default Graph3D;