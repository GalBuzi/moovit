import userRepo from "../repo/user.repo.js";
class UserService {
    async createUser(payload) {
        const result = await userRepo.createUser(payload);
        return result;
    }
    async getUserById(id) {
        const result = await userRepo.getUserById(id);
        return result;
    }
    async updateUser(id, payload) {
        const result = await userRepo.updateUser(id, payload);
        return result;
    }
    async deleteUser(id) {
        await userRepo.deleteUser(id);
    }
    async getAllUsers(filters) {
        const isValidFilters = Object.keys(filters).length > 0;
        const result = await userRepo.getAllUsers(filters, isValidFilters);
        return result;
    }
}
const userService = new UserService();
export default userService;
