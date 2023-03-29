import departmentService from "../services/department.service.js";
import { validationResult } from "express-validator";
class DepartmentController {
    async createDepartment(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const result = await departmentService.createDepartment(req.body);
        res.status(200).json(result);
    }
    async getDepartmentById(req, res) {
        const { id } = req.params;
        const result = await departmentService.getDepartmentById(id);
        res.status(200).json(result);
    }
    async updateDepartment(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;
        const payload = req.body;
        const result = await departmentService.updateDepartment(id, payload);
        res.status(200).json(result);
    }
    async getAllDepartmentsUsersCount(req, res) {
        const { order_by } = req.params;
        const result = await departmentService.getAllDepartmentsUsersCount(order_by);
        res.status(200).json(result);
    }
    async deleteDepartment(req, res) {
        const { id } = req.params;
        await departmentService.deleteDepartment(id);
        res.status(200).json("deletion succeeded");
    }
    async getAllDepartments(req, res) {
        const result = await departmentService.getAllDepartment();
        res.status(200).json(result);
    }
}
const departmentController = new DepartmentController();
export default departmentController;
