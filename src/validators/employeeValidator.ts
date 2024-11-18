import Joi from "joi";

export class EmployeeValidator {
    static employeeName = Joi.string().min(3).max(30).trim();
    static employeeSurname = Joi.string().min(3).max(30).trim();

    public static updateEmployee = Joi.object({
        name: this.employeeName.required(),
        surname: this.employeeSurname.required(),
    });
}