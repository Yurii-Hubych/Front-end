import {toast} from "react-toastify";
import {IApiErrorResponse} from "../models/IApiErrorResponse.ts";
import {AxiosError} from "axios";

export const toastError = (error: string | AxiosError<IApiErrorResponse>): void => {
    let message = "An error occurred";
    if (typeof error !== "string" && (error as AxiosError<IApiErrorResponse>).response?.data.message) {
        message = (error as AxiosError<IApiErrorResponse>).response!.data.message;
    } else if (typeof error === "string") {
        message = error;
    }

    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
    });
};