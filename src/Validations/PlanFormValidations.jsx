import Joi from 'joi'

const CLASS_CATEGORIES_MIN = 3

export const schema = Joi.object({
    name: Joi.string().required().max(100).messages({ "string.empty": `Name can't be empty` }), 
    monthlyValue: Joi.number().required().precision(2).min(50).messages({ 
        "number.base": "Monthly value must be a number",
        "number.min": "Monthly value must be at least 50",
        "number.precision": "Only 2 numbers after '.'" }), 
    classTotal: Joi.number().integer().required().min(10).messages({ 
        "number.base": "Class total must be a number",
        "number.integer": "Class total must be integer",
        "number.min": "Class total must be at least 10" }), 
    classCategoriesIds: Joi.array().required().min(CLASS_CATEGORIES_MIN).messages({ "array.min": `Must select at least ${CLASS_CATEGORIES_MIN} class categories` })
})

export const intialPlan = { name: "", monthlyValue: "", classTotal: "", classCategoriesIds: [] }
