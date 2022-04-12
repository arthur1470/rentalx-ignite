import { ICreateCategoryDTO } from "../../repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

class CreateSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationsRepository) {}

    execute({ name, description }: ICreateCategoryDTO): void {
        if (this.specificationsRepository.findByName(name)) {
            throw new Error("Specification already exists!");
        }

        this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
