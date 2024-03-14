import request from "supertest";
import { app } from "../index.js";

describe("Operaciones CRUD de CAFETERIA-NANACAO", () => {
    
    it("Obteniendo status 200- Tipo de Datos - 1 Objeto - Get/cafes", async () => {
        const { body, status } = await request(app).get("/cafes").send();
        console.log(status);
        console.log(body); 
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBe(true)
    });

    it("Detectando 404 - Delete/cafes/id", async ()=>{
        const idEliminar = 7;
        const jwt = "token";

        const { status } = await request(app).delete(`/cafes/${idEliminar}`).set("Authorization", jwt);
        
        expect(status).toBe(404);
    })

    it("Obtener status 201 - Post/cafes/id", async () => {
        const nuevoCafe = {
            id: 12,
            nombre: "Guayoyo"
        }
        const { body, status } = await request(app).post("/cafes").set('Content-Type', 'application/json').send(nuevoCafe);

        expect(body).toContainEqual(nuevoCafe);
        expect(status).toBe(201);
    });
    it("Obtener status 400 - Put/cafes", async () => {
        const cafeModificar = {
            id: 3,
            nombre: "Mocacino"
        }
        const { status } = await request(app).put("/cafes/5").send(cafeModificar);
        expect(status).toBe(400);
    });
});
