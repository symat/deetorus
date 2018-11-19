import { checkStatus, readBodyAsText, handleErrors } from "../utils.js";
import { changeStatusMessage } from "../components/navbar/navbar-actions";
import { loadGmlData } from "./data-model-actions";

export function fetchGmlFile(pathInPublic) {
  return fetchPublicTextFile(pathInPublic, loadGmlData);
}

export function fetchPublicTextFile(pathInPublic, postAction) {
  return dispatch => {
    dispatch(changeStatusMessage("Loading file from the server"));

    let url = `/` + pathInPublic;
    return fetch(url, {
      headers: {
        "Content-Type": "application/text"
      },
      credentials: "same-origin"
    })
      .then(checkStatus)
      .then(readBodyAsText)
      .then(text => {
        dispatch(postAction(text));
        dispatch(changeStatusMessage(""));
      })
      .catch(handleErrors(dispatch));
  };
}
