import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuOpen: null
}
export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        MENUOPEN(state) {
            state.menuOpen = "d-flex"
        },
        MENUCLOSE(state) {
            state.menuOpen = "d-none"
        }
    }
});
