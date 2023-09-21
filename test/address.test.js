import supertest from "supertest";
import { app } from "../src/application/web.js";
import { getTestContact, getTestAddress } from "./utils.test.js";

// describe('POST /api/contacts/:id/address', () => {
//     it('should can create new address', async () => {
//         const testContact = await getTestContact()
//         const result = await supertest(app)
//         .post('/api/contacts/' + testContact.id +  '/address')
//         .set('Authorization', '55574202-0aca-4018-bbd6-dfe318459f00')
//         .send({
//             street: "jalanin aja",
//             city: "Solo",
//             province: "Jateng",
//             country: "indonesia",
//             postal_code: "234321"
//             // contact_id: 1
//         })
//         expect(result.status).toBe(200);
//     })
// })

// describe('GET /api/contacts/:contactId/address/:addressId', () => {
//     it('should can get address', async () => {
//         const testContact = await getTestContact()
//         const testAddress = await getTestAddress()

//         const result = await supertest(app)
//         .get('/api/contacts/' + testContact.id + '/address/' + testAddress.id)
//         .set('Authorization', '55574202-0aca-4018-bbd6-dfe318459f00')

//         expect(result.status).toBe(200);
//     })
// })


// describe('PUT /api/contacts/:contactId/address/:addressId', () => {
//     it('should can update address', async () => {
//         const testContact = await getTestContact()
//         const testAddress = await getTestAddress()

//         const result = await supertest(app)
//         .put('/api/contacts/' + testContact.id + '/address/' + testAddress.id)
//         .set('Authorization', '55574202-0aca-4018-bbd6-dfe318459f00')
//         .send({
//             street: "jalan aerostreet",
//             city: "Semarang",
//             province: "Jateng",
//             country: "indonesia",
//             postal_code: "234200"
//         })
//         expect(result.status).toBe(200);
//     })
// })

describe('DELETE /api/contacts/:contactId/address/:addressId', () => {
    it('should can remove address', async () => {
        const testContact = await getTestContact()
        let testAddress = await getTestAddress() 

        const result = await supertest(app)
        .delete('/api/contacts/' + testContact.id + '/address/' + testAddress.id)
        .set('Authorization', '55574202-0aca-4018-bbd6-dfe318459f00')
        
        expect(result.status).toBe(200)

        // testAddress = await getTestAddress()
        // expect(testAddress).toBeNull()
    })
})

// describe('GET /api/contacts/:contactId/address', () => {
//     it('should can list address', async () => {
//         const testContact = await getTestContact()

//         const result = await supertest(app)
//         .get('/api/contacts/' + testContact.id + '/address')
//         .set('Authorization', '55574202-0aca-4018-bbd6-dfe318459f00')

//         expect(result.status).toBe(200)
//         // expect(result.body.data.length).toBe(1)
//     })
// })