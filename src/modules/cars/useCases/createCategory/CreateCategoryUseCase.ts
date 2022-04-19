import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository,
    ) {}

    async execute({ description, name }: IRequest): Promise<void> {
        if (await this.categoriesRepository.findByName(name))
            throw new AppError("Category already exists!");

        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
