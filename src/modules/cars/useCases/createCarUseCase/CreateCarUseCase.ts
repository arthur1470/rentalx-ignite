import { inject, injectable } from "tsyringe";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

// @injectable()
class CreateCarUseCase {
    constructor(
        // @inject("CarsRepository")
        private carsRepository: ICarsRepository,
    ) {}

    async execute({
        name,
        description,
        daily_rate,
        fine_amount,
        license_plate,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const carAlreadyExists = await this.carsRepository.findByLicensePlate(
            license_plate,
        );

        if (carAlreadyExists) {
            throw new AppError("Car already exists");
        }

        return this.carsRepository.create({
            name,
            description,
            daily_rate,
            fine_amount,
            license_plate,
            brand,
            category_id,
        });
    }
}

export { CreateCarUseCase };
