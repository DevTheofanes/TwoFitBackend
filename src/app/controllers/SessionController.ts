import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../models/User';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required().min(8),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Validation Fails' });
    }

    const userRepository = getRepository(User);

    const { email, password } = request.body;

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return response.status(400).json({ error: 'This user not does found!' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return response.status(400).json({ error: 'Password not does match.' });
    }

    const token = jwt.sign({ id: user.id }, 'secret', {
      expiresIn: '365d',
    });
    return response.json({ user, token });
  },
};
