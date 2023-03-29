import { validationResult } from "express-validator";
import userService from "../services/user.service.js";
class UserController {
    async createUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const result = await userService.createUser(req.body);
        res.status(200).json(result);
    }
    async getUserById(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;
        const result = await userService.getUserById(id);
        res.status(200).json(result);
    }
    async updateUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;
        const payload = req.body;
        const result = await userService.updateUser(id, payload);
        res.status(200).json(result);
    }
    async deleteUser(req, res) {
        const { id } = req.params;
        await userService.deleteUser(id);
        res.status(200).json("deletion succeeded");
    }
    async getAllUsers(req, res) {
        const filters = req.query;
        const result = await userService.getAllUsers(filters);
        res.status(200).json(result);
    }
}
const userController = new UserController();
export default userController;
