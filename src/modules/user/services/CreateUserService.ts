import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repository/UserRepository';
import User from '../typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const userExists = await userRepository.findByEmail(email);
    if (userExists) {
      throw new AppError('Email Alredy exists');
    }
    const user = userRepository.create({
      name,
      email,
      password,
    });
    await userRepository.save(user);
    return user;
  }
}
export default new CreateUserService();
