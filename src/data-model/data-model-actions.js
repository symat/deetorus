export const LOAD_GML_DATA = "LOAD_GML_DATA";

export function loadGmlData(gmlData) {
  return { type: LOAD_GML_DATA, gmlData };
}
