import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export default () => {
    const categoriesRepository = new CategoriesRepository();
    const listCategoriesUseCase = new ListCategoriesUseCase(
        categoriesRepository,
    );
    return new ListCategoriesController(listCategoriesUseCase);
};
