import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
    const { name, description } = request.body;

    if (categoriesRepository.findByName(name))
        return response
            .status(400)
            .json({ message: 'Category Already Exists!' });

    categoriesRepository.create({ name, description });

    return response.status(201).send();
});

categoriesRoutes.get('/', (request, response) => {
    return response.json(categoriesRepository.list());
});

export { categoriesRoutes };
