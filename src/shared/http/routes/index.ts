import { Router } from 'express';
const routes = Router();
routes.get('/', (req, res) => {
  return res.json({ message: 'Olá api-social-network' });
});

export default routes;
