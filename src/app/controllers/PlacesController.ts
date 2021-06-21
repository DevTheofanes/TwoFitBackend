import * as Yup from 'yup';
import { v4 as uuidV4 } from 'uuid';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Place } from '../models/Place';
import { PlaceTag } from '../models/PlaceTag';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Validation Fails' });
    }

    const placeRepository = getRepository(Place);
    const { name, description } = request.body;

    const data = {
      id: uuidV4(),
      name,
      description,
      stars_mean: 'Null',
      created_at: new Date(),
    };

    const place = placeRepository.create(data);
    await placeRepository.save(place);

    return response.status(201).json(place);
  },

  async listAll(request: Request, response: Response): Promise<Response> {
    const placeRepository = getRepository(Place);
    const placeTagRepository = getRepository(PlaceTag);

    const placesList = await placeRepository.find();

    const places = [];

    for (const key in placesList) {
      if (Object.prototype.hasOwnProperty.call(placesList, key)) {
        const element = placesList[key];

        const placesTagsList = await placeTagRepository.find({
          where: { place_id: element.id },
        });

        const tags = [];

        for (const tag in placesTagsList) {
          if (Object.prototype.hasOwnProperty.call(placesTagsList, tag)) {
            const elementTag = placesTagsList[tag];

            tags.push(elementTag);
          }
        }

        const shape = {
          id: element.id,
          name: element.name,
          description: element.description,
          starts_mean: element.stars_mean,
          tags,
        };

        places.push(shape);
      }
    }

    return response.status(201).json(places);
  },
};
