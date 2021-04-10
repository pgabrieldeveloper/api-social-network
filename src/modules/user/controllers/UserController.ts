import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
class UserController {
  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await CreateUserService.execute({ name, email, password });
    return res.status(201).json(user);
  }
}

export default new UserController();
