import { LOAD_GML_DATA } from "./data-model-actions";
import gml_loader_transformator from "./gml-loader-transformation";

export const initialDataModel = {
  nodes: [], // list of node objects (mandatory attr: id; optional: label, graphics)
  links: [], // list of edge objects (mandatory attr: source, target; optional: label, graphics)
  table: [], // 2D list of objects (mandatory attr: row, col, value; optional: label, graphics)
  globalAttributes: {},
  selectedNode: "",
  transformations: []
};

export function dataModel(state = initialDataModel, action) {
  switch (action.type) {
    case LOAD_GML_DATA:
      return gml_loader_transformator(state, action);

    default:
      return state;
  }
}
