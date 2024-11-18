import {IDepartment} from "../../models/IDepartment.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { departmentService } from "../../services/departmentService.ts";
import {AxiosError} from "axios";
import {IApiErrorResponse} from "../../models/IApiErrorResponse.ts";


type DepartmentSlice = {
    departments: IDepartment[];
}

const initialState: DepartmentSlice = {
    departments: []
}

const loadDepartments = createAsyncThunk<IDepartment[], void, {rejectValue: string}>(
    "departmentSlice/loadDepartments",
        async (_, ThunkAPI) => {
            try {
                const response = await departmentService.getAll();
                return ThunkAPI.fulfillWithValue(response);
            } catch (e) {
                const error = e as AxiosError<IApiErrorResponse>;
                return ThunkAPI.rejectWithValue(error.response!.data.message)
            }
        }
)

export const departmentSlice = createSlice({
    name: "departmentSlice",
    initialState: initialState,
    reducers: {

    },
    extraReducers: builder =>
        builder
            .addCase(loadDepartments.fulfilled, (state, action) => {
                state.departments = action.payload;
            })
})

export const departmentActions = {
    ...departmentSlice.actions,
    loadDepartments
}