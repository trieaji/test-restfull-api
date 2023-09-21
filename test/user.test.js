import supertest from "supertest";
import { app } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import bcrypt from "bcrypt";

describe('POST /api/users/login', () => {
    it('should can login', async () => {
        const result = await supertest(app)
        .post('/api/users/login')
        .send({
                username: "zikriganteng",
                password: "okee"
        })
        logger.info(result.body)

        expect(result.status).toBe(200)
    })
})

// describe('GET /api/users/current', () => {
//     it('should can get current user', async () => {
//         const result = await supertest(app)
//         .get('/api/users/current')
//         .set('Authorization', '89cc5f0c-33c9-4838-a8fd-f1cf171c8dca')
//         expect(result.status).toBe(200);
//         expect(result.body.data.username).toBe('leo');
//         expect(result.body.data.name).toBe('leorio');
//     })

//     it('should reject if token is invalid', async () => {
//         const result = await supertest(app)
//         .get('/api/users/current')
//         .set('Authorization', 'bukantoken')
//         expect(result.status).toBe(401);
//         expect(result.body.errors).toBeDefined();
//     })
// })

// describe('PATCH /api/users/update', () => {
//     it('should reject if token is invalid', async () => {
//         const result = await supertest(app)
//         .patch('/api/users/update')
//         .set('Authorization', '79de4eb3-eef2-4d4a-a9a5-231e3a6a2dcd')
//         .send({
//             name: 'zikri ganteng nih bro'
//         })
//         expect(result.status).toBe(200);
//     })
// })

// describe('DELETE /api/users/logout', () => {
//     it('should can logout', async () => {
//         const result = await supertest(app)
//         .delete('/api/users/logout')
//         .set('Authorization', 'cc2fa56b-5060-4e4f-ac31-2abe4ea0ee02')
        
//         expect(result.status).toBe(200);
//     })
// })