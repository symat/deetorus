import R from "ramda";
import { changeStatusMessage } from "./components/navbar/navbar-actions";

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
