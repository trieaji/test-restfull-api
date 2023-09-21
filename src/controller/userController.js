import { register, login, get, update, logout } from "../service/userService.js"; //kalau error, coba tanpa kurung kurawal
import { logger } from "../application/logging.js";

const registerUser = async (req,res,next) => {
    try {
        const result = await register(req.body)
        res.status(200).json({
            data:result
        })
    } catch (e) {
        next(e)
    }
}

const loginUser = async (req,res,next) => {
    try {
        const result = await login(req.body)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const logoutUser = async (req,res,next) => {
    try {
        const result = await logout(req.user.username);
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getUser = async (req,res,next) => {
    try {
        console.log('=== req ===')
        console.log(req)
        const username = req.user.username;
        // console.log('=== username con ===')
        // console.log(username)
        const result = await get(username)
        res.status(200).json({
            data: result
        })
        
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req,res,next) => {
    try {
        const username = req.user.username
        // console.log('=== username ===')
        // console.log(username)
        const request = req.body
        request.username = username

        const result = await update(request)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export { // kalau gk bisa coba tambahin default
    registerUser,
    loginUser,
    getUser,
    updateUser,
    logoutUser
}