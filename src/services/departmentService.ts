import axios, {AxiosError, AxiosResponse} from "axios";
import {ITokenPair} from "../models/IToken.ts";
import {retriveLocalStorageData} from "./helpers/retrieveLocalStorageData.ts";
import {IDepartment, IDepartmentForCreation} from "../models/IDepartment.ts";
import {configs} from "../configs/configs.ts";
import {IApiErrorResponse} from "../models/IApiErrorResponse.ts";
import {toastError} from "../errors/ToastError.ts";

const departmentEndpoints = {
    getAllDepartments: "/department",
    removeMembers: (id: string) => `/department/${id}/removeMembers`,
    updateInfo: (id: string) => `/department/${id}`,
    createDepartment: "/department",
    addMembers: (id: string) => `/department/${id}/addMembers`,
    deleteDepartment: (id: string) => `/department/${id}`
}

const axiosInstance = axios.create({
    baseURL: configs.apiGateway,
    headers: {
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.request.use(request => {
    const tokenPair: ITokenPair = retriveLocalStorageData("tokenPair");
    request.headers.Authorization = `${tokenPair.accessToken}`;
    return request;
});

const safeRequest = async <T, >(apiCall: () => Promise<T>): Promise<T> => {
    try {
        return (await apiCall() as AxiosResponse).data;
    } catch (e) {
        const error = e as AxiosError<IApiErrorResponse>;
        toastError(error);

        if (Array.isArray([] as T)) {
            return [] as T;
        }

        throw error;
    }
}

const departmentService = {
    getAll: () => safeRequest<IDepartment[]>(() => axiosInstance.get(departmentEndpoints.getAllDepartments)),

    removeDepartmentMembers: async (departmentId: string, members: string[]) =>
        safeRequest<void>(() => axiosInstance.patch(departmentEndpoints.removeMembers(departmentId), members)),

    updateDepartmentInfo: async (departmentId: string, {name}: { name: string }) =>
        safeRequest<void>(() => axiosInstance.patch(departmentEndpoints.updateInfo(departmentId), {name})),

    createDepartment: async (data: IDepartmentForCreation) =>
        safeRequest<void>(() => axiosInstance.post(departmentEndpoints.createDepartment, data)),

    addDepartmentMembers: async (departmentId: string, members: string[]) =>
        safeRequest<void>(() => axiosInstance.patch(departmentEndpoints.addMembers(departmentId), members)),

    deleteDepartment: async (departmentId: string) =>
        safeRequest<void>(() => axiosInstance.delete(departmentEndpoints.deleteDepartment(departmentId))),
}

export {
    departmentService
}