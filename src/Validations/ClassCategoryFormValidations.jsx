import Joi from 'joi'

export const schema = Joi.object({
    name: Joi.string().required().max(100).messages({"string.empty": `Name can't be empty`}), 
    icon: Joi.string().required().max(255).messages({"string.empty": `Icon must be choosed`}), 
    description: Joi.string().required().max(255).messages({"string.empty": `Description can't be empty`}), 
    teacher: Joi.string().required().max(255).messages({"string.empty": `Teacher name can't be empty`})
})

export const intialClassCategory = {name: "", icon: "", description: "", teacher: ""}