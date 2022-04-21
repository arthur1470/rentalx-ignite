import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        return this.repository.save(car);
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.repository.findOne({ license_plate });
    }

    async findAvailable(
        name?: string,
        brand?: string,
        category_id?: string,
    ): Promise<Car[]> {
        const carsQuery = this.repository
            .createQueryBuilder("c")
            .where("available = :available", { available: true });

        if (name) carsQuery.andWhere("c.name = :name", { name });
        if (brand) carsQuery.andWhere("c.brand = :brand", { brand });
        if (category_id)
            carsQuery.andWhere("c.category_id = :category_id", { category_id });

        return carsQuery.getMany();
    }
}

export { CarsRepository };
