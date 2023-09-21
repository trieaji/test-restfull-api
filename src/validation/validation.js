import { ResponseError } from "../error/responseError.js"

const validatedesu = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false
    })
    if(result.error) {
        console.log('=== result error ===')
        console.log(result.error)
        throw new ResponseError(400, result.error.message)
    } else {
        return result.value
    }
}

export {
    validatedesu
}