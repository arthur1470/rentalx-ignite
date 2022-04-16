import { Request, Response } from "express";

import { Category } from "../../entities/Category";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

    async handle(_request: Request, response: Response): Promise<Category[]> {
        return response.json(await this.listCategoriesUseCase.execute());
    }
}

export { ListCategoriesController };
