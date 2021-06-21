import * as Yup from 'yup';
import { v4 as uuidV4 } from 'uuid';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { PlaceTag } from '../models/PlaceTag';
import { Place } from '../models/Place';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      icon_url: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Validation Fails' });
    }

    const placeTagRepository = getRepository(PlaceTag);
    const placeRepository = getRepository(Place);

    const { name, icon_url } = request.body;
    const { place_id } = request.params;

    const placeTagExists = await placeTagRepository.findOne({
      where: { name },
    });

    if (placeTagExists) {
      return response.status(400).json({
        error: 'This Tag already exists.',
      });
    }

    const placeExists = await placeRepository.findOne({
      where: { id: place_id },
    });

    if (!placeExists) {
      return response.status(400).json({
        error: 'This Place not does found.',
      });
    }

    const data = {
      id: uuidV4(),
      name,
      icon_url,
      place_id,
      created_at: new Date(),
    };

    const placeTag = placeTagRepository.create(data);
    await placeTagRepository.save(placeTag);

    return response.status(201).json(placeTag);
  },

  async listAll(request: Request, response: Response): Promise<Response> {
    return response.status(201).send();
  },
};
