import { authenticationSlice } from "./reducers/authenticationReducer";
import { menuSlice } from "./reducers/menuReducer";
import { activitySlice } from "./reducers/activityReducer";

/* Authentication Functions */
export const { SIGNIN, SIGNUP, LOGOUT, RESET } = authenticationSlice.actions;
/* Menu Functions */
export const { MENUOPEN, MENUCLOSE } = menuSlice.actions;
/* ACTIVITY */
export const { ACTIVITES, ADDACTIVITY, EDITACTIVITY, DELETEACTIVITY } = activitySlice.actions;
