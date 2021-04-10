import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import LoginUserService from '../services/LoginUserService';
class UserController {
  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await CreateUserService.execute({ name, email, password });
    return res.status(201).json(user);
  }
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const userToken = await LoginUserService.execute({ email, password });
    return res.status(200).json(userToken);
  }
}

export default new UserController();
