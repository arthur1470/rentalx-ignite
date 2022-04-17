import { inject, injectable } from "tsyringe";

import { ICreateCategoryDTO } from "../../repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository,
    ) {}

    async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
        if (await this.specificationsRepository.findByName(name)) {
            throw new Error("Specification already exists!");
        }

        await this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
