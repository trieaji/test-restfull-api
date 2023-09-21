import express from "express"
import { getUser, updateUser, logoutUser } from "../controller/userController.js";
import { createContact, getContact, updateContact, removeContact, searchContact } from "../controller/contactController.js";
import { createAddress, getAddress, updateAddress, removeAddress, listAddress } from "../controller/addressController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware)

// User API
userRouter.get('/api/users/current', getUser)
userRouter.patch('/api/users/update', updateUser)
userRouter.delete('/api/users/logout', logoutUser)

// Contact API
userRouter.post('/api/contacts', createContact)
userRouter.get('/api/contacts/:id', getContact)
userRouter.put('/api/contacts/:id/concon', updateContact)
userRouter.delete('/api/contacts/:id', removeContact)
userRouter.get('/api/contacts', searchContact)

// Address API
userRouter.post('/api/contacts/:id/address', createAddress)
userRouter.get('/api/contacts/:contactId/address/:addressId', getAddress)
userRouter.put('/api/contacts/:contactId/address/:addressId', updateAddress)
userRouter.delete('/api/contacts/:contactId/address/:addressId', removeAddress)
userRouter.get('/api/contacts/:contactId/address', listAddress)

export {
    userRouter
}