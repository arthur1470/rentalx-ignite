import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository,
    ) {}

    async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
        if (await this.specificationsRepository.findByName(name))
            throw new AppError("Specification already exists!");

        await this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
