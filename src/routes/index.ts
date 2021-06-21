import { Router } from 'express';

import { categoriesRoutes } from './RCategoriesRoute';
import { placesRoutes } from './RPlacesRoutes';
import { placeTagsRoutes } from './RPlaceTagsRoutes';
import { ratingsRoutes } from './RRatingsRoutes';
import { sessionRoutes } from './RSessionRoutes';
import { usersRoutes } from './RUsersRoutes';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/users', usersRoutes);
routes.use('/session', sessionRoutes);
routes.use('/places', placesRoutes);
routes.use('/places/tags', placeTagsRoutes);
routes.use('/places/ratings', ratingsRoutes);

export { routes };
