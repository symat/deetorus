import R from "ramda";
import { changeStatusMessage } from "./components/navbar/navbar-actions";
import max from "ramda/es/max";

export const handleErrors = R.curry(function(dispatch, err) {
  if (err.status) {
    if (err.status === 401) {
      dispatch(changeStatusMessage("http error code: " + err.status));
    } else
      setTimeout(() => {
        throw err;
      });
  } else {
    setTimeout(() => {
      throw err;
    });
  }
});

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let status = response.status;
    let statusText = response.statusText ? response.statusText : "n/a";
    let error = new Error(`http error: ${status} (${statusText})`);
    error.response = response;
    error.status = status;
    error.statusText = statusText;
    throw error;
  }
}

export function parseJSON(response) {
  return response.json();
}

export function readBodyAsText(response) {
  return response.text();
}

export function scaleGraph(nodes, scale) {
  if(nodes.length === 0) return nodes;
  let minX = null, maxX = null, minY = null, maxY = null, minZ = null, maxZ = null;
  for(let n of nodes) {
    minX = 'graphics' in n && 'x' in n.graphics && (minX === null || minX > n.graphics.x) ? n.graphics.x : minX;
    minY = 'graphics' in n && 'y' in n.graphics && (minY === null || minY > n.graphics.y) ? n.graphics.y : minY;
    minZ = 'graphics' in n && 'z' in n.graphics && (minZ === null || minZ > n.graphics.z) ? n.graphics.z : minZ;
    maxX = 'graphics' in n && 'x' in n.graphics && (maxX === null || maxX < n.graphics.x) ? n.graphics.x : maxX;
    maxY = 'graphics' in n && 'y' in n.graphics && (maxY === null || maxY < n.graphics.y) ? n.graphics.y : maxY;
    maxZ = 'graphics' in n && 'z' in n.graphics && (maxZ === null || maxZ < n.graphics.z) ? n.graphics.z : maxZ;
  }
  console.log("minX: " + minX);
  console.log("maxX: " + maxX);

  let maxSize = 0;
  maxSize = max(maxSize, minX !== null ? maxX - minX : 0);
  maxSize = max(maxSize, minY !== null ? maxY - minY : 0);
  maxSize = max(maxSize, minZ !== null ? maxZ - minZ : 0);
  if(maxSize === 0) return nodes;
  console.log("maxSize: " + maxSize);
  let result = [];
  console.log("result before: " + result);
  for(let i=0; i<nodes.length; i++) {
    result[i] = Object.assign({}, nodes[i]);
    if('graphics' in nodes[i]) {
      if('x' in nodes[i].graphics)
        result[i].graphics.x = minX === maxX ? 0 : (nodes[i].graphics.x - minX) / maxSize * scale - (0.5 * scale * (maxX - minX) / maxSize);
      if('y' in nodes[i].graphics)
       result[i].graphics.y = minY === maxY ? 0 : (nodes[i].graphics.y - minY) / maxSize * scale - (0.5 * scale * (maxY - minY) / maxSize);
      if('z' in nodes[i].graphics)
        result[i].graphics.z = minZ === maxZ ? 0 : (nodes[i].graphics.z - minZ) / maxSize * scale - (0.5 * scale * (maxZ - minZ) / maxSize);
    }
  }
  console.log("result after: " + result);
  return result;
}
