import * as Yup from 'yup';
import { v4 as uuidV4 } from 'uuid';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../models/User';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required().min(8),
      avatar_url: Yup.string(),
      phone: Yup.string().required().min(11).max(11),
      cep: Yup.string(),
      cpf: Yup.string().min(11).max(11),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Validation Fails' });
    }

    const userRepository = getRepository(User);

    const { name, email, password, avatar_url, phone, cep, cpf } = request.body;

    const userExists = await userRepository.findOne({
      where: { email },
    });

    if (userExists) {
      return response.status(400).json({ error: 'This user aready exists!' });
    }

    const data = {
      id: uuidV4(),
      name,
      email,
      password,
      avatar_url,
      phone,
      cep,
      cpf,
      created_at: new Date(),
    };

    const user = userRepository.create(data);
    await userRepository.save(user);

    return response.status(201).json(user);
  },
};
