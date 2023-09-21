import supertest from "supertest";
import { app } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

/* describe('POST /api/contacts', () => {
    it('should can create new contact', async () => {
        const result = await supertest(app)
            .post("/api/contacts")
            .set('Authorization', '55574202-0aca-4018-bbd6-dfe318459f00')
            .send({
                first_name: "kana",
                last_name: "boon",
                email: "kanaboon@gmail.com",
                phone: "08090000001",
                userfirst_id: 10
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe("kana");
        expect(result.body.data.last_name).toBe("boon");
        expect(result.body.data.email).toBe("kanaboon@gmail.com");
        expect(result.body.data.phone).toBe("08090000001");
    });
}) */

/* describe('GET /api/contacts/:id', () => {
    it('should can get contact', async () => {
        const result = await supertest(app)
            .get("/api/contacts/" + 2)
            .set('Authorization', '55574202-0aca-4018-bbd6-dfe318459f00');

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(2);
        expect(result.body.data.first_name).toBe('kana');
        expect(result.body.data.last_name).toBe('boon');
        expect(result.body.data.email).toBe('kanaboon@gmail.com');
        expect(result.body.data.phone).toBe('08090000001');
    });

    it('should return 404 if contact id is not found', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .get("/api/contacts/" + (testContact.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
}); */

// describe('PUT /api/contacts/:id/concon', () => {
//     it('should can update existing contact', async () => {
//         const result = await supertest(app)
//         .put("/api/contacts/" + 3 + '/concon')
//         .set('Authorization', '55574202-0aca-4018-bbd6-dfe318459f00')
//         .send({
//             first_name: "Nefer",
//             last_name: "pitou",
//             email: "neferpitou@gmail.com",
//             phone: "09999999"
//         })
//         expect(result.status).toBe(200);
//     })
// })

/* describe('DELETE /api/contacts/:id', () => {
    it('should can delete contact', async () => {
        const result = await supertest(app)
        .delete('/api/contacts/' + 2)
        .set('Authorization', '55574202-0aca-4018-bbd6-dfe318459f00')

        expect(result.status).toBe(200);
    })
}) */

describe('GET /api/contacts', () => {
    it('should can search without parameter', async () => {
        const result = await supertest(app)
            .get('/api/contacts')
            .set('Authorization', '55574202-0aca-4018-bbd6-dfe318459f00')

        expect(result.status).toBe(200);
    });

    it('should can search to page 2', async () => {
        const result = await supertest(app)
            .get('/api/contacts')
            .query({
                page: 2
            })
            .set('Authorization', '55574202-0aca-4018-bbd6-dfe318459f00')

        logger.info(result.body);

        expect(result.status).toBe(200);
    });

    it('should can search using name', async () => {
        const result = await supertest(app)
            .get('/api/contacts')
            .query({
                name: "zikri ganteng nih bro"
            })
            .set('Authorization', '55574202-0aca-4018-bbd6-dfe318459f00')

        logger.info(result.body);

        expect(result.status).toBe(200);
    });

    it('should can search using email', async () => {
        const result = await supertest(app)
            .get('/api/contacts')
            .query({
                email: "neferpitou@gmail.com"
            })
            .set('Authorization', '55574202-0aca-4018-bbd6-dfe318459f00')

        logger.info(result.body);

        expect(result.status).toBe(200);
    });

    it('should can search using phone', async () => {
        const result = await supertest(app)
            .get('/api/contacts')
            .query({
                phone: "09999999"
            })
            .set('Authorization', '55574202-0aca-4018-bbd6-dfe318459f00')

        logger.info(result.body);

        expect(result.status).toBe(200);
    });
})