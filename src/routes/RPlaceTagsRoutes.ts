import { Router } from 'express';
import PlaceTagsController from '../app/controllers/PlaceTagsController';

const placeTagsRoutes = Router();

placeTagsRoutes.post('/:place_id', PlaceTagsController.create);

export { placeTagsRoutes };
