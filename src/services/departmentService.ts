import axios from "axios";
import {IToken} from "../models/IToken.ts";
import {retriveLocalStorageData} from "./helpers/retrieveLocalStorageData.ts";
import {IDepartmentForCreation} from "../models/IDepartment.ts";
import {configs} from "../configs/configs.ts";


const axiosInstance = axios.create({
    //TODO change this to the actual API URL
    baseURL: configs.apiGateway,
    headers: {
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.request.use(request => {
    const tokenPair: IToken = retriveLocalStorageData("tokenPair");
    request.headers.Authorization = `${tokenPair.accessToken}`;
    return request;
})

const departmentService = {
    getAll: async () => {
        try {
            const response = await axiosInstance.get("/department/withMembers");
            return response.data;
        } catch (e) {
            console.error(e);
            return null;
        }
    },

    updateDepartmentInfo: async (departmentId: string, {name}: {name: string}) => {
        try {
            const response = await axiosInstance.patch(`/department/${departmentId}`, {name});
            return response.data;
        } catch (e) {
            console.error(e);
            return null;
        }
    },

    createDepartment: async (data: IDepartmentForCreation) => {
        try {
            const response = await axiosInstance.post("/department", data);
            return response.data;
        } catch (e) {
            console.error(e);
            return null;
        }
    },

    updateDepartmentMembers: async (departmentId: string, members: string[]) => {
        try {
            const response = await axiosInstance.patch(`/department/${departmentId}/addMembers`, members);
            return response.data;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}

export {
    departmentService
}