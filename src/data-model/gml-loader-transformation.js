import { initialDataModel } from "./data-model-reducer";

export default function gml_loader_transformator(currentState, action) {
  // TODO: load the actual GML file from public files

  return Object.assign({}, currentState, {
    matrix: initialDataModel.matrix,
    selectedNode: initialDataModel.selectedNode,
    transformations: [...currentState.transformations, action]
  });
}
