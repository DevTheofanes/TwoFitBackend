import * as Yup from 'yup';
import { v4 as uuidV4 } from 'uuid';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Category } from '../models/Category';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      subcategory: Yup.string().required(),
      background_url: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Validation Fails' });
    }

    const categoryRepository = getRepository(Category);
    const { name, subcategory, background_url } = request.body;

    const categoryExists = await categoryRepository.findOne({
      where: { name, subcategory },
    });

    if (categoryExists) {
      return response
        .status(400)
        .json({ error: 'This category aready exists!' });
    }

    const data = {
      id: uuidV4(),
      name,
      subcategory,
      background_url,
      created_at: new Date(),
    };

    const category = categoryRepository.create(data);
    await categoryRepository.save(category);

    return response.status(201).json(category);
  },

  async listAll(request: Request, response: Response): Promise<Response> {
    const categoryRepository = getRepository(Category);

    const categories = await categoryRepository.find();

    return response.status(201).json(categories);
  },
};
