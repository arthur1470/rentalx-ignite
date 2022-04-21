import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create car specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationRepositoryInMemory,
        );
    });

    it("Should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Audi A1",
            description: "Carro espaçoso",
            daily_rate: 110,
            fine_amount: 40,
            license_plate: "klj-0099",
            brand: "Audi",
            category_id: "e11e2116-ce51-4976-a29c-f74064784942",
        });

        const specification = await specificationRepositoryInMemory.create({
            name: "teste",
            description: "teste",
        });

        const specificationCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id: [specification.id],
        });

        expect(specificationCars).toHaveProperty("specifications");
        expect(specificationCars.specifications.length).toBe(1);
    });

    it("Should not be able to add a new specification to a non-existent car ", () => {
        expect(async () => {
            await createCarSpecificationUseCase.execute({
                car_id: "123",
                specifications_id: ["123"],
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
