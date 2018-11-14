import { CHANGE_NAVBAR_MENU } from "./navbar-actions";

const initial = {
  isWorking: false,
  workingMessage: "",
  selectedMenu: "aa"
};

export function navbar(state = initial, action) {
  switch (action.type) {
    case CHANGE_NAVBAR_MENU:
      return Object.assign({}, state, {
        selectedMenu: action.selectedMenu
      });

    default:
      return state;
  }
}
