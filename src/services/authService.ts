import axios, {AxiosError} from "axios";
import {IAuthRegisterModel} from "../models/IAuthRegisterModel.ts";
import {ILoginCredentials} from "../models/ILoginCredentials.ts";
import {jwtDecode} from "jwt-decode";
import {IToken} from "../models/IToken.ts";
import {IApiErrorResponse} from "../models/IApiErrorResponse.ts";
import {toastError} from "../errors/ToastError.ts";
import {configs} from "../configs/configs.ts";

//TODO return localhost
const axiosInstance = axios.create({
    baseURL: configs.apiGateway,
    timeout: 10000,
    headers: {}
})

axiosInstance.interceptors.request.use(request => {
    return request;
})

const authService = {
    register: async (user: IAuthRegisterModel): Promise<boolean> => {
        try {
            await axiosInstance.post("/auth/register", user);
            return true;
        }
        catch (e) {
            const error = e as AxiosError<IApiErrorResponse>;
            toastError(error);
            return false;
        }
    },

    login: async (credentials: ILoginCredentials): Promise<boolean> => {
        try {
            const response = await axiosInstance.post<IToken>("/auth/login", credentials);
            const tokenPayload = jwtDecode(response.data.accessToken);
            localStorage.setItem('tokenPair', JSON.stringify(response.data));
            localStorage.setItem("userInfo", JSON.stringify(tokenPayload));

            return !!(response.data.accessToken && response.data.refreshToken);
        }
        catch (e) {
            const error = e as AxiosError<IApiErrorResponse>;
            toastError(error);
            return false;
        }
    },

    refresh: async (refreshToken: string): Promise<boolean> => {
        try {
            const response = await axiosInstance.post<IToken>("/auth/refresh",
                null,
                {headers: {Authorization: refreshToken}});

            const tokenPayload = jwtDecode(response.data.accessToken);
            localStorage.setItem('tokenPair', JSON.stringify(response.data));
            localStorage.setItem("userInfo", JSON.stringify(tokenPayload));
            return true;
        }
        catch (e) {
            const error = e as AxiosError<IApiErrorResponse>;
            toastError(error);
            return false;
        }
    },

    acquireForgotPasswordToken: async (email: string): Promise<boolean> => {
        try {
            await axiosInstance.post("/auth/password/forgot", {email});
            return true;
        }
        catch (e) {
            const error = e as AxiosError<IApiErrorResponse>;
            toastError(error);
            return false;
        }
    },

    setForgotPassword: async (password: string, actionToken: string): Promise<boolean> => {
        try {
            await axiosInstance.put(`/auth/password/forgot/${actionToken}`, {password});
            return true;
        }
        catch (e) {
            const error = e as AxiosError<IApiErrorResponse>;
            toastError(error);
            return false;
        }
    }
}

export {
    authService
}