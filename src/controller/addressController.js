import { create, get, update, remove, list } from "../service/addressService.js";

const createAddress = async (req,res,next) => {
    try {
        // console.log('=== req luur ===')
        // console.log(req)
        const user = req.user;
        const request = req.body;
        const contactId = req.params.id;

        const result = await create(user,contactId,request)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getAddress = async (req,res,next) => {
    try {
        // console.log('=== req luur ===')
        // console.log(req)
        const user = req.user
        const contactId = req.params.contactId
        const addressId = req.params.addressId

        const result = await get(user,contactId,addressId)
        res.status(200).json({
            data:result
        })
    } catch (error) {
        next(error)
    }
}

const updateAddress = async (req,res,next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const addressId = req.params.addressId;
        const request = req.body;
        request.id = addressId

        const result= await update(user,contactId,request)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const removeAddress = async (req,res,next) => {
    try {
        // console.log('=== req luur ===')
        // console.log(req)
        const user = req.user;
        const contactId = req.params.contactId;
        const addressId = req.params.addressId;

        const result= await remove(user,contactId,addressId)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const listAddress = async (req,res,next) => {
    try {
        // console.log('=== req luur ===')
        // console.log(req)
        const user = req.user;
        const contactId = req.params.contactId;

        const result= await list(user,contactId)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export {
    createAddress,
    getAddress,
    updateAddress,
    removeAddress,
    listAddress
}