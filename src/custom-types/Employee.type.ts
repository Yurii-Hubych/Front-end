import {IEmployee} from "../models/IEmployee.ts";

export type UpdateEmployeeInfo = Pick<IEmployee, "name" | "surname" >