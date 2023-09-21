import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";

const authMiddleware = async (req,res,next) => {
    // console.log('=== req laksa ===')
    // console.log(req)
    const kodes = req.get('Authorization')
    // console.log('=== req get ===')
    // console.log(kodes)
    // console.log(kodes.authorization)
    if(!kodes) {
        res.status(401).json({
            errors: "Unauthorized laksa"
        }).end()
    } else {
        const user = await prismaClient.userfirst.findFirst({
            where: {
                // kode: kodes[3]
                token: kodes
            }
        });
        // console.log('=== user use ===')
        // console.log(user)
        if(!user) {
            res.status(401).json({
                errors: "Unauthorized broo"
            }).end()
        } else {
            // logger.info('=== hai kamyu ===')
            // logger.info(req)
            req.user = user;
            next()
        }
    }
}

export {
    authMiddleware
}