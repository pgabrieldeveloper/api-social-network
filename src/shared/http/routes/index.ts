import { Router } from 'express';
import userRouter from '../../../modules/user/routes/user.routes';
const routes = Router();
routes.get('/', (req, res) => {
  return res.json({ message: 'Olá api-social-network' });
});
routes.use('/user', userRouter);

export default routes;
