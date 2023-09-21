import { ResponseError } from "../error/responseError.js";
import { logger } from "../application/logging.js";

const errorMiddleware = async (err, req, res, next) => {
    if(!err) {
        // console.log('=== woyy luur ===')
        next()
        return
    }

    if(err instanceof ResponseError) {
        res.status(err.status).json({
            errors: err.message
        }).end()
    } else {
        console.log('=== test luur broo ===')
        console.log(err.message)
        // logger.info(err.message)
        res.status(500).json({
            errors: err.message
        }).end()
    }
}

export {
    errorMiddleware
}