import userRepo from "../repo/user.repo.js";
import { IUserModel, IUsersFilterModel } from "../types/user.js";

class UserService {
  async createUser(payload: IUserModel): Promise<IUserModel> {
    const result = await userRepo.createUser(payload);
    return result;
  }

  async getUserById(id: string): Promise<IUserModel> {
    const result = await userRepo.getUserById(id);
    return result;
  }

  async updateUser(id: string, payload: IUserModel): Promise<IUserModel> {
    const result = await userRepo.updateUser(id, payload);
    return result;
  }

  async deleteUser(id: string): Promise<void> {
    await userRepo.deleteUser(id);
  }

  async getAllUsers(filters: IUsersFilterModel) { 
    const result = await userRepo.getAllUsers(filters);
    return result;
  }
}

const userService = new UserService();
export default userService;
