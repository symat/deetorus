export const CHANGE_NAVBAR_MENU = "CHANGE_NAVBAR_MENU";
export const CHANGE_STATUS_MESSAGE = "CHANGE_STATUS_MESSAGE";

export function changeNavbarMenu(selectedMenu) {
  return { type: CHANGE_NAVBAR_MENU, selectedMenu };
}

export function changeStatusMessage(message) {
  return { type: CHANGE_STATUS_MESSAGE, message };
}
