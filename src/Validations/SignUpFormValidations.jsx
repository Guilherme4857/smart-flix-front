import Joi from 'joi'

const employeeEmailValidation = { switch: [{ is: "Admin", then: Joi.string().pattern(/(@smartflix.com.br){1}/) }, 
                                           { is: "Teacher", then: Joi.string().pattern(/(@smartflix.com.br){1}/) }] }

const nameErrorsMessages = { "string.empty": `Name can't be empty.`, "string.max": `Name must have less than 150 letters.` }
const roleErrorsMessages = { "any.invalid": `Select a value.` }
const emailErrorsMessages = { "string.empty": `Email can't be empty.`, "string.pattern.base": `E-mail must have @smartflix.com.br domain.` }
const passwordErrorsMessages = { "string.empty": `Password can't be empty.` }
const confirmPasswordErrorsMessages = { "any.only": `Confirm password don't match password.` }

export const schema = Joi.object({
    name: Joi.string().required().max(150).messages(nameErrorsMessages), 
    role: Joi.string().invalid("Selecione...").messages(roleErrorsMessages),
    email: Joi.string().required().when(Joi.ref("role"), employeeEmailValidation).max(150).messages(emailErrorsMessages), 
    password: Joi.string().required().max(250).messages(passwordErrorsMessages), 
    confirmPassword: Joi.string().equal(Joi.ref('password')).required().messages(confirmPasswordErrorsMessages)
})

export const initialSignUp = { name: "", role: "Selecione...", email: "", password: "", confirmPassword: "" }