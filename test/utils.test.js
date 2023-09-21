import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt"

export const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            userfirst_id: 10
        }
    })
}

export const createTestAddress = async () => {
    const contact = await getTestContact();
    await prismaClient.address.create({
        data: {
            contact_id: contact.id,
            street: "jalan aerostreet",
            city: "Semarang",
            province: "Jateng",
            country: "indonesia",
            postal_code: "234200"
        }
    })
}

export const getTestAddress = async () => {
    return prismaClient.address.findFirst({
        where: {
            contact: {
                userfirst_id: 10
            }
        }
    })
}