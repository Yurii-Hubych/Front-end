import axios, {AxiosError} from "axios";
import {IApiErrorResponse} from "../models/IApiErrorResponse.ts";
import {toastError} from "../errors/ToastError.ts";
import {IToken} from "../models/IToken.ts";
import {retriveLocalStorageData} from "./helpers/retrieveLocalStorageData.ts";
import {configs} from "../configs/configs.ts";


//TODO replace with localhost
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

const userService = {
    deleteById: async (userId: string):Promise<void> => {
        try {
            await axiosInstance.delete(`/users/${userId}`);
        }
        catch (e) {
            const error = e as AxiosError<IApiErrorResponse>;
            toastError(error);
            return Promise.reject(error);
        }
    },

    blockUser: async (userId: string):Promise<void> => {
        try {
            await axiosInstance.patch(`/users/block/${userId}`);
        }
        catch (e) {
            const error = e as AxiosError<IApiErrorResponse>;
            toastError(error);
            return Promise.reject(error);
        }
    },

    unblockUser: async (userId: string):Promise<void> => {
        try {
            await axiosInstance.patch(`/users/unblock/${userId}`);
        }
        catch (e) {
            const error = e as AxiosError<IApiErrorResponse>;
            toastError(error);
            return Promise.reject(error);
        }
    },
}

export {
    userService
}