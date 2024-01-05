import Joi from 'joi'

export const schema = Joi.object({
    email: Joi.string().required().max(150).messages({"string.empty": `Email can't be empty.`}), 
    password: Joi.string().required().max(250).messages({"string.empty": `Password can't be empty.`}), 
})

export const intialLogin = { email: "", password: "" }