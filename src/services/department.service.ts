import departmentRepo from "../repo/department.repo.js"
import { IDepartmentModel, IDepartmentUsersCount } from "../types/department.js"

class DepartmentService {
    async createDepartment(payload:IDepartmentModel):Promise<IDepartmentModel> {
        const result = await departmentRepo.createDepartment(payload)
        return result
    }

    async getDepartmentById(id: string):Promise<IDepartmentModel>{
        const result = await departmentRepo.getDepartmentById(id);
        return result
    }

    async updateDepartment(id: string, payload:IDepartmentModel):Promise<IDepartmentModel>{
        const result = await departmentRepo.updateDepartment(id, payload)
        return result
    }

    async getAllDepartmentsUsersCount(order_by: string):Promise<IDepartmentUsersCount[]>{
        const result = await departmentRepo.getAllDepartmentsUsersCount(order_by)
        return result
    }

    async deleteDepartment(id:string):Promise<void>{
        await departmentRepo.deleteDepartment(id);
    }

    async getAllDepartment(){
        const result = await departmentRepo.getAllDepartments()
        return result
    }
}

const departmentService = new DepartmentService()
export default departmentService