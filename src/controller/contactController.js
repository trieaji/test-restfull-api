import { create, get, update, remove, search } from "../service/contactService.js";
import { logger } from "../application/logging.js";

const createContact = async (req,res,next) => {
    try {
        // console.log('=== req luur ===')
        // console.log(req)
        const user = req.user;
        const request = req.body;
        const result = await create(user,request)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getContact = async (req,res,next) => {
    try {
        // console.log('=== req luur ===')
        // console.log(req)
        const user = req.user
        const request = req.params.id
        const result = await get(user, request)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const updateContact = async (req,res,next) => {
    try {
        // console.log('=== req luur ===')
        // console.log(req)
        const user = req.user
        const contactId = req.params.id
        const request = req.body
        request.id = contactId

        const result = await update(user,request)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const removeContact = async (req,res,next) => {
    try {
        const user = req.user
        const request = req.params.id
        
        const result = await remove(user, request)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const searchContact = async (req,res,next) => {
    try {
        const user = req.user
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            size: req.query.size
        }

        const result = await search(user,request)
        res.status(200).json({
            data: result.data,
            paging: result.paging
        })
    } catch (error) {
        next(error)
    }
}

export {
    createContact,
    getContact,
    updateContact,
    removeContact,
    searchContact
}