import { authenticationSlice } from "./reducers/authenticationReducer";
import { menuSlice } from "./reducers/menuReducer";

/* Authentication Functions */
export const { SIGNIN, SIGNUP, LOGOUT, RESET } = authenticationSlice.actions;
/* Menu Functions */
export const { MENUOPEN, MENUCLOSE } = menuSlice.actions;
