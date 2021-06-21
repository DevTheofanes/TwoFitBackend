import { Router } from 'express';
import PlacesController from '../app/controllers/PlacesController';

const placesRoutes = Router();

placesRoutes.post('/', PlacesController.create);

placesRoutes.get('/', PlacesController.listAll);

export { placesRoutes };
