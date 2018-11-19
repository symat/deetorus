import { LOAD_GML_DATA } from "./data-model-actions";
import gml_loader_transformator from "./gml-loader-transformation";

export const initialDataModel = {
  nodes: [],
  links: [],
  matrix: [],
  nodeAttributes: {},
  linkAttributes: {},
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
