import {IEmployee} from "./IEmployee.ts";

type IDepartmentEmployee = Omit<IEmployee, "_department" | "_position">

export interface IDepartment extends  IDepartmentEmployee{
    _id: string;
    name: string;
    members: IDepartmentEmployee[];
    _adminUser: IDepartmentEmployee;
}

export type IDepartmentForCreation = Pick<IDepartment, "name"> & {
    _adminUser: string;
};