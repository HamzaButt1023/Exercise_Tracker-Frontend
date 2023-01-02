import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
export const activitySlice = createSlice({
    name: "activity",
    initialState,
    reducers: {
        ACTIVITES(state,param) {
            return param.payload
        },
        ADDACTIVITY(state,param) {
            console.log( param );
        },   
        EDITACTIVITY(state,param) {
            state.menuOpen = "d-flex"
        },
        DELETEACTIVITY(state,param) {
            return param.payload
        }
    }
});
