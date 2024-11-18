import Joi from "joi";

export class UserValidator {
    private static name = Joi.string().min(3).max(30).trim();
    private static surname = Joi.string().min(3).max(30).trim();
    private static email = Joi.string().email({ tlds: { allow: false } }).regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .message("Email must be a valid format.");
    private static password = Joi.string()
        .min(8)
        .trim()
        .message("Password must be at least 8 characters long.")
        .regex(/[A-Z]/)
        .message("Password must contain at least one uppercase letter.")
        .regex(/[a-z]/)
        .message("Password must contain at least one lowercase letter.")
        .regex(/\d/)
        .message("Password must contain at least one number.")
        .max(30);

    private static confirmPassword = Joi.any().equal(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' })

    public static register = Joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        email: this.email.required(),
        password: this.password.required(),
        confirmPassword: this.confirmPassword.required()
    });

    public static login = Joi.object({
        email: this.email.required(),
        password: this.password.required()
    });

    public static resetPasswordSendToken = Joi.object({
        email: this.email.required()
    })

    public static forgotPassword = Joi.object({
        password: this.password.required(),
        confirmPassword: this.confirmPassword.required()
    });
}