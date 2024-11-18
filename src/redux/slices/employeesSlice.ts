import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IEmployee} from "../../models/IEmployee.ts";
import {employeeService} from "../../services/employeeService.ts";
import {AxiosError} from "axios";
import {IApiErrorResponse} from "../../models/IApiErrorResponse.ts";

type EmployeesSlice = {
    employees: IEmployee[];
    //TODO add isLoading
}

const initialState: EmployeesSlice = {
    employees: []
}

const loadEmployees = createAsyncThunk<IEmployee[], void, {rejectValue: string}>(
    "employees/loadEmployees",
    async (_, ThunkAPI) => {
        try {
            const response = await employeeService.getAll();
            return ThunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError<IApiErrorResponse>;
            return ThunkAPI.rejectWithValue(error.response!.data.message)
        }
    });

const searchForEmployees = createAsyncThunk<IEmployee[], string, {rejectValue: string}>(
    "employees/searchForEmployees",
    async (queryParam, ThunkAPI) => {
        try {
            const response = await employeeService.searchForEmployees(queryParam);
            return ThunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError<IApiErrorResponse>;
            return ThunkAPI.rejectWithValue(error.response!.data.message)
        }
    });

export const employeesSlice = createSlice({
    name: "employees",
    initialState: initialState,
    reducers: {
    },
    extraReducers: builder =>
        builder
            .addCase(loadEmployees.fulfilled, (state, action) => {
                state.employees = action.payload;
            })
            .addCase(searchForEmployees.fulfilled, (state, action) => {
                state.employees = action.payload;
            })
});

export const employeesActions = {
    ...employeesSlice.actions,
    loadEmployees,
    searchForEmployees
}
