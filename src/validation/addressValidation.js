import joi from "joi"

const createAddressValidation = joi.object({
    // id: joi.number().positive().required(),
    street: joi.string().max(100).optional(),
    city: joi.string().max(100).optional(),
    province: joi.string().max(100).optional(),
    country: joi.string().max(100).required(),
    postal_code: joi.string().max(10).required()
    // contact_id: joi.number().positive().optional()
})

const getAddressValidation = joi.number().min(1).positive().required();

const updateAddressValidation = joi.object({
    id: joi.number().min(1).positive().required(),
    street: joi.string().max(100).optional(),
    city: joi.string().max(100).optional(),
    province: joi.string().max(100).optional(),
    country: joi.string().max(100).required(),
    postal_code: joi.string().max(10).required()
})

export {
    createAddressValidation,
    getAddressValidation,
    updateAddressValidation
}