import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import UserRepository from '../typeorm/repository/UserRepository';
import User from '../typeorm/entities/User';
import uploadConfigAvatar from '../../../config/uploadAvatar';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(user_id);
    if (!user) {
      throw new AppError('User not founnd.', 404);
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(
        uploadConfigAvatar.directory,
        user.avatar,
      );
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;
    await userRepository.save(user);
    return user;
  }
}
export default new UpdateUserAvatarService();
