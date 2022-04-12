import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();
const createSpecificationService = new CreateSpecificationService(
    specificationsRepository,
);

specificationsRoutes.post("/", (request, response) => {
    const { name, description } = request.body;
    createSpecificationService.execute({ name, description });

    return response.status(201).send();
});

export { specificationsRoutes };
