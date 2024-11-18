import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {employeesSlice} from "./slices/employeesSlice.ts";
import {userNotificationsSlice} from "./slices/userNotificationsSlice.ts";
import {departmentSlice} from "./slices/departmentSlice.ts";


export const store = configureStore({
    reducer: {
        employeesSlice: employeesSlice.reducer,
        userNotificationsSlice: userNotificationsSlice.reducer,
        departmentsSlice: departmentSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();