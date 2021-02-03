const request = require("supertest");
const app = require("./app");


describe('POST /v1/addpoints', () => {
    it('add points to user', async () => {
        const userdata1 = {
                    "payerName":"DANNON",
                    "points": 300,
                    "transactionDate": "10/31 10AM" 
                };
        const res1 = await request(app).post("/v1/addpoints").send(userdata1);
        expect(res1.statusCode).toBe(200)
     })

     it('add points to user', async () => {
        const userdata2 = {
                    "payerName":"UNILEVER",
                    "points": 200,
                    "transactionDate": "10/31 11AM" 
                };
        const res2 = await request(app).post("/v1/addpoints").send(userdata2);
        expect(res2.statusCode).toBe(200)
     })

     it('add points to user', async () => {
        const userdata3 = {
                    "payerName":"DANNON",
                    "points": -200,
                    "transactionDate": "10/31 3PM" 
                };
        const res3 = await request(app).post("/v1/addpoints").send(userdata3);
        expect(res3.statusCode).toBe(200)
            })

     it('add points to user', async () => {
            const userdata4 = {
                    "payerName":"MILLER COORS",
                    "points": 10000,
                    "transactionDate": "11/1 2PM" 
                };
        const res4 = await request(app).post("/v1/addpoints").send(userdata4);
        expect(res4.statusCode).toBe(200)
            })

     it('add points to user', async () => {
        const userdata5 = {
                    "payerName":"DANNON",
                    "points": 1000,
                    "transactionDate": "11/2 2PM" 
                };
        const res5 = await request(app).post("/v1/addpoints").send(userdata5);
        expect(res5.statusCode).toBe(200)
            })

});

describe('DELETE /v1/deletepoints', () => {
        it('delete points from users',async() => {
                const res = await request(app).delete("/v1/deletepoints/5000")
                expect(res.statusCode).toBe(200)
        })
})

describe('GET /v1/balance', () => {
        it('get user account balance',async() => {
                const res = await request(app).get("/v1/balance")
                expect(res.statusCode).toBe(200)
        })
})

