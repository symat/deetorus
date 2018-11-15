export const LOAD_GML_DATA = "LOAD_GML_DATA";

export function loadGmlData(pathInPublic) {
  return { type: LOAD_GML_DATA, pathInPublic };
}
