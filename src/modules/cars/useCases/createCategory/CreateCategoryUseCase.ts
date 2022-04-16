import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    async execute({ description, name }: IRequest): Promise<void> {
        if (await this.categoriesRepository.findByName(name))
            throw new Error("Category already exists!");

        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
