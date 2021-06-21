import { Router } from 'express';
import RatingsController from '../app/controllers/RatingsController';

const ratingsRoutes = Router();

ratingsRoutes.post('/:user_author/:place_id', RatingsController.create);
ratingsRoutes.get('/:place_id', RatingsController.listById);

export { ratingsRoutes };
