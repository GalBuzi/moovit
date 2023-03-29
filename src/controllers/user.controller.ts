import { Request, Response } from "express";
import { validationResult } from "express-validator";
import userService from "../services/user.service.js";
import { IUserModel, IUsersFilterModel } from "../types/user.js";

class UserController {
  async createUser(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const result = await userService.createUser(req.body as IUserModel);
    res.status(200).json(result);
  }

  async getUserById(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const result = await userService.getUserById(id);
    res.status(200).json(result);
  }

  async updateUser(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const payload = req.body as IUserModel;
    const result = await userService.updateUser(id, payload);
    res.status(200).json(result);
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(200).json("deletion succeeded");
  }

  async getAllUsers(req: Request, res: Response) {
    const filters = req.query as IUsersFilterModel;
    const result = await userService.getAllUsers(filters);
    res.status(200).json(result);
  }
}

const userController = new UserController();
export default userController;
