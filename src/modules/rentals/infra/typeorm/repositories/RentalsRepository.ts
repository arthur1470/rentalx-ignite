import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async create({
        car_id,
        user_id,
        expected_return_date,
        id,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date,
            id,
            end_date,
            total,
        });

        return this.repository.save(rental);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.repository.findOne({ car_id, end_date: null });
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.repository.findOne({ user_id, end_date: null });
    }

    async findById(id: string): Promise<Rental> {
        return this.repository.findOne({ id });
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        return this.repository.find({ where: { user_id }, relations: ["car"] });
    }
}

export { RentalsRepository };
