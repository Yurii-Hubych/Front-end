import axios, {AxiosError} from "axios";
import {toastError} from "../errors/ToastError.ts";
import {IApiErrorResponse} from "../models/IApiErrorResponse.ts";
import {retriveLocalStorageData} from "./helpers/retrieveLocalStorageData.ts";
import {IToken} from "../models/IToken.ts";
import {IEmployee} from "../models/IEmployee.ts";
import {UpdateEmployeeInfo} from "../custom-types/Employee.type.ts";
import {configs} from "../configs/configs.ts";
import Cookies from "js-cookie"

//TODO return localhost
const axiosInstance = axios.create({
    baseURL: configs.apiGateway,
    timeout: 10000,
    headers: {
    }
});

axiosInstance.interceptors.request.use(request => {
    const tokenPair: IToken = retriveLocalStorageData("tokenPair");
    request.headers.Authorization = `${tokenPair.accessToken}`;
    return request;
})

const employeeService = {
    getAll: async ():Promise<IEmployee[]> => {
        try {
            const response = await axiosInstance.get("/employee");
            return response.data;
        }
        catch (e) {
            const error = e as AxiosError<IApiErrorResponse>;
            toastError(error);
            return Promise.reject(error);
        }
    },

    updateEmployeeInfo: async (employeeId: string,employee: UpdateEmployeeInfo) => {
        try {
            console.log(employee);
            const response = await axiosInstance.patch(`/employee/updateInfo/${employeeId}`, employee);
            return response.data;
        }
        catch (e) {
            const error = e as AxiosError<IApiErrorResponse>;
            toastError(error);
        }
    },

    searchForEmployees: async (queryParam: string): Promise<IEmployee[]> => {
        try {
            const response = await axiosInstance.get(`/employee?query=${queryParam}`, {withCredentials: true});
            console.log(Cookies.get("refreshToken"));
            return response.data;
        }
        catch (e) {
            const error = e as AxiosError<IApiErrorResponse>;
            toastError(error);
            return Promise.reject(error);
        }
    },

    getEmployeesWithoutDepartment: async (): Promise<IEmployee[]> => {
        try {
            const response = await axiosInstance.get("/employee?withDepartment=false");
            return response.data;
        }
        catch (e) {
            const error = e as AxiosError<IApiErrorResponse>;
            toastError(error);
            return Promise.reject(error);
        }
    }
}

export {
    employeeService
}