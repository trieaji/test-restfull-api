import { validatedesu } from "../validation/validation.js";
import { createContactValidation, getContactValidation, updateContactValidation, searchContactValidation } from "../validation/contactValidation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/responseError.js";


const create = async (user, request) => {
    // console.log('=== user luur ===')
    // console.log(user)
    // console.log('=== request ===')
    // console.log(request)
    const myContact = validatedesu(createContactValidation, request)
    myContact.userfirst_id = user.id
    // console.log('=== myContact ===')
    // console.log(myContact)

    const dataContact = prismaClient.contact.create({
        data: myContact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
            // userfirst_id: true
        }
    })
    return dataContact
}

const get = async (user, request) => {
    // console.log('=== user luur ===')
    // console.log(user)
    // console.log('=== request ===')
    // console.log(request)
    const myContact = validatedesu (getContactValidation, request)
    // console.log('=== myContact ===')
    // console.log(myContact)

    const dataContact = await prismaClient.contact.findUnique({
        where: {
            id: myContact
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })

    if (!dataContact) {
        throw new ResponseError(404, "contact is not found");
    }

    return dataContact;
}

const update = async (user, request) => {
    const myContact = validatedesu(updateContactValidation, request)

    const dataContact = await prismaClient.contact.update({
        where: {
            id: myContact.id
        },
        data: {
            first_name: myContact.first_name,
            last_name: myContact.last_name,
            email: myContact.email,
            phone: myContact.phone
        }
    })

    return dataContact
}

const remove = async (user,request) => {
    const myContact = validatedesu(getContactValidation, request)

    const dataContact = await prismaClient.contact.delete({
        where: {
            id: myContact
        }
    })

    return dataContact
}

const search = async (user,request) => {
    request = validatedesu(searchContactValidation, request)

    // 1 ((page - 1) * size) = 0
    // 2 ((page - 1) * size) = 10
    const skipaja = (request.page - 1) * request.size

    let filters = [];
    filters.push({
        userfirst_id: user.id
    })

    if(request.name){
        filters.push({
            OR: [
                {
                    first_name: {
                        contains: request.name
                    }
                },
                {
                    last_name: {
                        contains: request.name
                    }
                }
            ]
        })
    }
    if(request.email) {
        filters.push({
            email: {
                contains: request.email
            }
        })
    }
    if(request.phone){
        filters.push({
            phone: {
                contains: request.phone
            }
        })
    }

    const contack = await prismaClient.contact.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skipaja
    })

    const totalItems = await prismaClient.contact.count({
        where: {
            AND: filters
        }
    })

    return {
        data: contack,
        paging: {
            page: request.page,
            total_item : totalItems,
            total_page : Math.ceil(totalItems / request.size)
        }
    }
}

export {
    create,
    get,
    update,
    remove,
    search
}