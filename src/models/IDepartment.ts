import {IEmployee} from "./IEmployee.ts";

type IEmployeeForDepartment = Omit<IEmployee, "_department" | "_position">

export interface IDepartment extends  IEmployeeForDepartment{
    _id: string;
    name: string;
    members: IEmployeeForDepartment[];
    _adminUser: IEmployeeForDepartment;
}

export type IDepartmentForCreation = Pick<IDepartment, "name"> & {
    _adminUser: string;
};