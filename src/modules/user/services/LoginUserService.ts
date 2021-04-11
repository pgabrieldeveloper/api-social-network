import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import jwt from '../../../config/jwt';
import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repository/UserRepository';
import User from '../typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
  token: string;
}

class LoginUserService {
  public async execute({ email, password }: IRequest) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    const confimed = await compare(password, user.password);
    if (!confimed) {
      throw new AppError('Conbinations email/password invalid');
    }
    const token = sign({}, jwt.secret, {
      subject: user.id,
      expiresIn: jwt.expiresIn,
    });

    return { user, token };
  }
}

export default new LoginUserService();
