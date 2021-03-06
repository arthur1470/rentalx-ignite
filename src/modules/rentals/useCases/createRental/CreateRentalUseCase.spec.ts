import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(async () => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();

        dayjsProvider = new DayjsDateProvider();

        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsProvider,
            carsRepositoryInMemory,
        );

        await carsRepositoryInMemory.create({
            id: "123",
            brand: "teste1",
            name: "teste1",
            category_id: "teste1",
            daily_rate: 100,
            description: "teste1",
            fine_amount: 200,
            license_plate: "123",
        });

        await carsRepositoryInMemory.create({
            id: "1234",
            brand: "teste2",
            name: "teste2",
            category_id: "teste2",
            daily_rate: 100,
            description: "teste2",
            fine_amount: 200,
            license_plate: "1234",
        });
    });

    it("Should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "123",
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if there's another open to the same user", async () => {
        await createRentalUseCase.execute({
            user_id: "123",
            car_id: "123",
            expected_return_date: dayAdd24Hours,
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "123",
                car_id: "1234",
                expected_return_date: new Date(),
            }),
        ).rejects.toEqual(
            new AppError("There's a rental in progress for user!"),
        );
    });

    it("Should not be able to create a new rental if there's another open to the same car", async () => {
        await createRentalUseCase.execute({
            user_id: "123",
            car_id: "123",
            expected_return_date: dayAdd24Hours,
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "321",
                car_id: "123",
                expected_return_date: dayAdd24Hours,
            }),
        ).rejects.toEqual(new AppError("Car is unavailable"));
    });

    it("Should not be able to create a new rental with invalid return time", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "123",
                car_id: "123",
                expected_return_date: dayjs().toDate(),
            }),
        ).rejects.toEqual(new AppError("Invalid return time!"));
    });
});
