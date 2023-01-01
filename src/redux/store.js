import { configureStore } from "@reduxjs/toolkit";
import { authenticationSlice } from "./reducers/authenticationReducer";
import { menuSlice } from "./reducers/menuReducer";
import { activitySlice } from "./reducers/activityReducer";

export const store = configureStore({
    reducer: {
        authentication: authenticationSlice.reducer,
        menu: menuSlice.reducer,
        activity: activitySlice.reducer
    }
});
