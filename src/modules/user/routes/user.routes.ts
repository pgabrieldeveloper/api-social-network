import { Router } from 'express';
import UserController from '../controllers/UserController';
import multer from 'multer';
import uploadConfigAvatar from '../../../config/uploadAvatar';
import isAuthenticate from '../middlewares/isAuthenticate';

const userRouter = Router();

const upload = multer(uploadConfigAvatar);

userRouter.post('/', UserController.create);
userRouter.post('/login', UserController.login);
userRouter.patch(
  '/avatar',
  isAuthenticate,
  upload.single('avatar'),
  UserController.uploadAvatar,
);
export default userRouter;
