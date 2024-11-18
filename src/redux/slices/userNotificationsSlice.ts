import {createSlice} from "@reduxjs/toolkit";

interface UserNotificationsSlice {
    accessDenied: boolean;
    registrationSuccess: boolean;
}

const initialState: UserNotificationsSlice = {
    accessDenied: false,
    registrationSuccess: false
}

export const userNotificationsSlice = createSlice({
    name: "userNotificationsSlice",
    initialState: initialState,
    reducers: {
        setAccessDenied: (state, action) => {
            state.accessDenied = action.payload;
        },
        setRegistrationSuccess: (state, action) => {
            state.registrationSuccess = action.payload;
        }
    }
})

export const userNotificationsActions = {...userNotificationsSlice.actions};