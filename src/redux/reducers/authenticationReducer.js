import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedin: false,
    userName: null,
    userID: null
}
export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        SIGNIN(state,param) {
            state.isLoggedin = true;
            // console.log(param.payload.userName);
        },
        SIGNUP(state) {
            
        },
        LOGOUT(state) {
            return { ...state, isLoggedin: false, userID: null, userName: null }
        },
        RESET(state) {
            
        }
    }
});
