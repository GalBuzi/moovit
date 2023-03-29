import { db } from "../utils.js";
import { InternalServerException } from "../exceptions/http.exceptions.js";
class DepartmentRepo {
    async createDepartment(payload) {
        const query = `INSERT INTO departments SET ?`;
        const [result] = (await db.query(query, payload));
        if (!result) {
            throw new InternalServerException("No department was created");
        }
        const dep = await this.getDepartmentById("" + result.insertId);
        return dep;
    }
    async getDepartmentById(id) {
        const query = `SELECT * FROM departments WHERE id = ${id};`;
        const [result] = (await db.query(query));
        if (!result || !result[0]) {
            throw new InternalServerException("No department was found");
        }
        return result;
    }
    async updateDepartment(id, payload) {
        const query = `with cte as
                    (SELECT id FROM departments WHERE id = ${id}) 
                    UPDATE departments
                    SET ${payload.name ? `name = '${payload.name}',` : ""} 
                    ${payload.description
            ? `description = '${payload.description}'`
            : ""}
                    WHERE id IN (SELECT * FROM cte);`;
        const [result] = (await db.query(query));
        if (!result || !result.affectedRows) {
            throw new InternalServerException("No department was updated");
        }
        const dep = await this.getDepartmentById(id);
        return dep;
    }
    async getAllDepartmentsUsersCount(order_by) {
        const query = `SELECT d.name, count(*) as num_of_users
                    FROM departments d JOIN users u on d.id = dep_id
                    GROUP BY d.id
                    ${order_by.toUpperCase() === "ASC" ||
            order_by.toUpperCase() === "DESC"
            ? `ORDER BY num_of_users ${order_by.toUpperCase()}`
            : 'ORDER BY num_of_users DESC'};`;
        const [result] = (await db.query(query));
        if (!result || !result[0]) {
            throw new InternalServerException("No departments were found");
        }
        return result;
    }
    async deleteDepartment(id) {
        const query_delete_users = `DELETE FROM users WHERE dep_id = ${id}`;
        const query_delete_department = `DELETE FROM departments WHERE id = ${id}`;
        await db.beginTransaction();
        try {
            await db.query(query_delete_users);
            await db.query(query_delete_department);
            await db.commit();
        }
        catch (err) {
            await db.rollback();
            throw err;
        }
    }
    async getAllDepartments() {
        const query = `SELECT * FROM departments;`;
        const [result] = (await db.query(query));
        if (!result || !result[0]) {
            throw new InternalServerException("No department was found");
        }
        return result;
    }
}
const departmentRepo = new DepartmentRepo();
export default departmentRepo;
