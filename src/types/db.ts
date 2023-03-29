import { IUserModel, IUsersFilterModel } from "./user.js";
import { IDepartmentModel, IDepartmentUsersCount } from "./department.js";

export interface UserDatabaseActions {
    createUser:(payload: IUserModel) => Promise<IUserModel>;
    getUserById(id: string): Promise<IUserModel>;
    updateUser:(id: string, payload: IUserModel) => Promise<IUserModel>;
    deleteUser:(id: string) => Promise<void>;
    getAllUsers: (filters: IUsersFilterModel) => Promise<IUserModel[]>
}

export interface DepartmentDatabaseActions {
  createDepartment:(payload: IDepartmentModel) => Promise<IDepartmentModel>;
  getDepartmentById:(id: string) => Promise<IDepartmentModel>;
  updateDepartment:(id: string, payload: IDepartmentModel) => Promise<IDepartmentModel>;
  getAllDepartmentsUsersCount(order_by: string): Promise<IDepartmentUsersCount[]>;
  deleteDepartment:(id:string) => Promise<void>;
  getAllDepartments: () => Promise<IDepartmentModel[]>;
}
