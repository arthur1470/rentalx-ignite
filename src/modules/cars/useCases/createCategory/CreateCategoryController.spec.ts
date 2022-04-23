import { hash } from "bcryptjs";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Create Category Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = v4();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id
                         , name
                         , email
                         , password
                         , "isAdmin"
                         , created_at
                         , driver_license
                         )
              values('${id}'
                    , 'admin'
                    , 'admin@rentx.com.br'
                    , '${password}'
                    , true
                    , 'now()'
                    , 'XXXXXX'
                ) `,
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category supertest",
                description: "Category supertest",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
    });
});
