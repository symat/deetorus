export const CHANGE_NAVBAR_MENU = "CHANGE_NAVBAR_MENU";

export function changeNavbarMenu(selectedMenu) {
  return { type: CHANGE_NAVBAR_MENU, selectedMenu };
}
