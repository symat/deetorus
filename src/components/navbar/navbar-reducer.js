import { CHANGE_NAVBAR_MENU, CHANGE_STATUS_MESSAGE } from "./navbar-actions";

const initial = {
  isWorking: false,
  statusMessage: "",
  selectedMenu: "new"
};

export function navbar(state = initial, action) {
  switch (action.type) {
    case CHANGE_NAVBAR_MENU:
      return Object.assign({}, state, {
        selectedMenu: action.selectedMenu
      });

    case CHANGE_STATUS_MESSAGE:
      return Object.assign({}, state, {
        statusMessage: action.message
      });

    default:
      return state;
  }
}
