import { registerUserFirstValidation, loginUserFirstValidation, getUserFirstValidation, updateUserFirstValidation } from "../validation/userValidation.js"; //kalau error, coba tanpa kurung kurawal
import { prismaClient } from "../application/database.js";
import { validatedesu } from "../validation/validation.js";
import { logger } from "../application/logging.js";
import bcrypt from "bcrypt"; //kalau error, coba tanpa kurung kurawal
import { ResponseError } from "../error/responseError.js";
import { v4 as uuid } from "uuid";

const register = async (request) => {
    const user = validatedesu(registerUserFirstValidation, request)
    let salt = await bcrypt.genSalt()
    // console.log(salt);
    user.password = await bcrypt.hash(user.password, salt)

    const result = prismaClient.userfirst.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    })

    return result
}

const login = async (request) => {
    const loginReq = validatedesu(loginUserFirstValidation, request)
    // console.log(loginReq);
    const user = await prismaClient.userfirst.findFirst({
        where: {
            username: loginReq.username
        },
        select: {
            username: true,
            password: true
        }
    })
    // logger.info('=== tests ===')
    // logger.info(user.username)

    if(!user) {//Kalau usernya tidak ada
        throw new ResponseError(401, "Username or password wrong luuur")
    }
    // console.log({user: user.password.replace(/^\$2y/, "$2a")});
    // console.log({user: loginReq.password});
    // var stored_hash = '$2a$10$vxliJ./aXotlnxS9HaJoXeeASt48.ddU7sHNOpXC/cLhgzJGdASCe'
    const isPasswordValid = await bcrypt.compare(loginReq.password, user.password)
    // console.log('=== isPasswordValid ===')
    // console.log(isPasswordValid);
       
    // if (isPasswordValid) {
    //     logger.info('Password is correct')
    // } else  {
    //     logger.info('Password is incorrect')
    // }

    if(!isPasswordValid) {
        throw new ResponseError(401, "Username or password wrong luuur")
    }

    const kodes = uuid().toString()
    const result = prismaClient.userfirst.updateMany({
        data: {
            token: kodes  
        },
        where: {
            username: user.username
        }
    })

    return result
    


    // logger.info('=== ispassvalid ===')
    // logger.info(isPasswordValid)
}

const get = async (request) => {
    // console.info('=== req ===')
    // console.info(request)
    const usernames  = validatedesu(getUserFirstValidation, request)
    // console.info('usernames aja')
    // console.info(usernames)
    const user = await prismaClient.userfirst.findFirst({
        where: {
            username: usernames
        },
        select: {
            username: true,
            name: true
        }
    })

    // logger.info('=== get ===')
    // logger.info(user)

    if(!user) {
        throw new ResponseError(404, "User is not found")
    }

    // console.log('=== user aja ===')
    // console.log(user)

    return user
}

const update = async (request) => {
    const user = validatedesu(updateUserFirstValidation, request)
    console.log('=== user njiir ===')
    console.log(user)
    let salt = await bcrypt.genSalt()

    let datas = {};
    if(user.name){
        datas.name = user.name
    }
    if(user.password){
        datas.password = await bcrypt.hash(user.password, salt)
    }

    const resulto = await prismaClient.userfirst.updateMany({
        where: {
            username: user.username
            // username: user //kalau error coba pakai yg ini
        },
        data: {
            name: datas.name
        }
    })

    console.log('=== result boos ===')
    console.log(resulto)

    return resulto
    
} 

const logout = async (request) => {
    const usernames = validatedesu(getUserFirstValidation, request)

    const user = await prismaClient.userfirst.findFirst({
        where: {
            username: usernames
        }
    })

    if(!user){
        throw new ResponseError(404, 'user is not found')
    }

    const result = prismaClient.userfirst.updateMany({
        where: {
            username: usernames
        },
        data: {
            token: null
        }
    })

    return result
}

export { // kalau gk bisa coba tambahin default
    register,
    login,
    get,
    update,
    logout
}