import { Router } from 'express';
import CategoriesController from '../app/controllers/CategoriesController';

const categoriesRoutes = Router();

categoriesRoutes.post('/', CategoriesController.create);

categoriesRoutes.get('/', CategoriesController.listAll);

export { categoriesRoutes };
