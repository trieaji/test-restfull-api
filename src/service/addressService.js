import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/responseError.js";
import { validatedesu } from "../validation/validation.js";
import { createAddressValidation, getAddressValidation, updateAddressValidation } from "../validation/addressValidation.js";
import { getContactValidation } from "../validation/contactValidation.js";

const checkContact = async (user, contactId) => {
    contactId = validatedesu(getContactValidation, contactId)

    const totalContactInDatabase = await prismaClient.contact.count({ //untuk pengecekan datanya ada atau tidak
        where: {
            userfirst_id: user.id,
            id: contactId
        }
    })

    if(totalContactInDatabase !== 1){
        throw new ResponseError(404, 'contact is not found')
    }

    return contactId
}

const create = async (user,contactId,request) => {
    contactId = await checkContact(user,contactId)

    const myAddress = validatedesu(createAddressValidation, request)
    myAddress.contact_id = contactId

    const dataAddress = await prismaClient.address.create({
        data: myAddress,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })

    return dataAddress
}

const get = async (user,contactId,addressId) => {
    contactId = await checkContact(user,contactId)
    addressId = validatedesu(getAddressValidation, addressId)

    const address = await prismaClient.address.findFirst({
        where: {
            contact_id: contactId,
            id: addressId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })

    if(!address) {
        throw new ResponseError(404, 'address is not found')
    }

    return address
}

const update = async (user,contactId,request) => {
    contactId = await checkContact(user,contactId)
    const myAddress = validatedesu(updateAddressValidation, request)

    const totalAddressInDatabase = await prismaClient.address.count({
        where: {
            contact_id: contactId,
            id: myAddress.id
        }
    })

    if(totalAddressInDatabase !== 1) {
        throw new ResponseError(404, "address is not found")
    }

    const dataAddress = prismaClient.address.update({
        where: {
            id: myAddress.id
        },
        data: {
            street: myAddress.street,
            city: myAddress.city,
            province: myAddress.province,
            country: myAddress.country,
            postal_code: myAddress.postal_code
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })

    return dataAddress
}

const remove = async (user,contactId,addressId) => {
    contactId = await checkContact(user,contactId)
    const address = validatedesu(getAddressValidation, addressId)

    const totalAddressInDatabase = await prismaClient.address.count({
        where: {
            contact_id: contactId,
            id: address
        }
    })

    if(totalAddressInDatabase !== 1) {
        throw new ResponseError(404, "address is not found")
    }

    const dataAddress = await prismaClient.address.delete({
        where: {
            id: address
        }
    })

    return dataAddress

}

const list = async (user,contactId) => {
    contactId = await checkContact(user,contactId)

    const dataAddress = await prismaClient.address.findMany({
        where: {
            contact_id: contactId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
    console.log('=== dataAddress ===')
    console.log(dataAddress)
    return dataAddress
}

export {
    create,
    get,
    update,
    remove,
    list
}