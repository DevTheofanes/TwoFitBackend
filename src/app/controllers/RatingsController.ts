import * as Yup from 'yup';
import { v4 as uuidV4 } from 'uuid';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Rating } from '../models/Rating';
import { User } from '../models/User';
import { Place } from '../models/Place';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      stars: Yup.string().required(),
      comments: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Validation Fails' });
    }

    const ratingRepository = getRepository(Rating);
    const userRepository = getRepository(User);
    const placeRepository = getRepository(Place);

    const { stars, comments } = request.body;
    const { user_author, place_id } = request.params;

    const userAuthorExists = await userRepository.findOne({
      where: { id: user_author },
    });

    if (!userAuthorExists) {
      return response
        .status(400)
        .json({ error: 'User Author not does found!' });
    }

    const placeExists = await placeRepository.findOne({
      where: { id: place_id },
    });

    if (!placeExists) {
      return response.status(400).json({ error: 'Place not does found!' });
    }

    const data = {
      id: uuidV4(),
      stars,
      comments,
      user_author,
      place_id,
      created_at: new Date(),
    };

    const rating = ratingRepository.create(data);
    await ratingRepository.save(rating);

    return response.status(201).json(rating);
  },

  async listById(request: Request, response: Response): Promise<Response> {
    const ratingRepository = getRepository(Rating);
    const placeRepository = getRepository(Place);
    const userRepository = getRepository(User);

    const { place_id } = request.params;

    const placeExists = await placeRepository.findOne({
      where: { id: place_id },
    });

    if (!placeExists) {
      return response.status(400).json({ error: 'Place not does found!' });
    }

    const ratingsList = await ratingRepository.find({
      where: { place_id },
    });

    const ratings = [];

    for (const key in ratingsList) {
      if (Object.prototype.hasOwnProperty.call(ratingsList, key)) {
        const element = ratingsList[key];

        const author = await userRepository.findOne({
          where: { id: element.user_author },
        });

        const shape = {
          id: element.id,
          author,
          placeExists,
          stars: element.stars,
          comments: element.comments,
        };

        ratings.push(shape);
      }
    }

    return response.json(ratings);
  },
};
