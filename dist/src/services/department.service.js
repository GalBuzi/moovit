import departmentRepo from "../repo/department.repo.js";
class DepartmentService {
    async createDepartment(payload) {
        const result = await departmentRepo.createDepartment(payload);
        return result;
    }
    async getDepartmentById(id) {
        const result = await departmentRepo.getDepartmentById(id);
        return result;
    }
    async updateDepartment(id, payload) {
        const result = await departmentRepo.updateDepartment(id, payload);
        return result;
    }
    async getAllDepartmentsUsersCount(order_by) {
        const result = await departmentRepo.getAllDepartmentsUsersCount(order_by);
        return result;
    }
    async deleteDepartment(id) {
        await departmentRepo.deleteDepartment(id);
    }
    async getAllDepartment() {
        const result = await departmentRepo.getAllDepartments();
        return result;
    }
}
const departmentService = new DepartmentService();
export default departmentService;
