import Joi from "joi";

export class DepartmentValidator {
    static name = Joi.string().min(3).max(40).required();

    static createDepartment = Joi.object({
        name: DepartmentValidator.name,
    });

    static updateDepartment = Joi.object({
        name: DepartmentValidator.name,
    });
}