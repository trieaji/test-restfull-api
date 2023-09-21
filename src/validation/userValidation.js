import joi from "joi";
// Kalau terjadi error coba max nya dikembalikan menjadi max(20)

const registerUserFirstValidation = joi.object({
    username: joi.string().max(100).required(),
    password: joi.string().max(100).required(),
    name: joi.string().max(100).required(),
    token: joi.string().max(100)
})

const loginUserFirstValidation = joi.object({
    username: joi.string().max(100).required(),
    password: joi.string().max(100).required()
})

// const getUserFirstValidation = joi.object({
//     username: joi.string().max(100).required()
// })

const getUserFirstValidation = joi.string().max(100).required();

const updateUserFirstValidation = joi.object({
    username: joi.string().max(100).required(),
    password: joi.string().max(100).optional(),
    name: joi.string().max(100).optional()
})

const registerUserSecondValidation = joi.object({
    username: joi.string().max(100).required(),
    password: joi.string().max(100).required(),
    name: joi.string().max(100).required()
})

export {
    registerUserFirstValidation,
    registerUserSecondValidation,
    loginUserFirstValidation,
    getUserFirstValidation,
    updateUserFirstValidation
}