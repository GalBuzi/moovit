import { db } from "../utils.js";
import { InternalServerException } from "../exceptions/http.exceptions.js";
class UserRepo {
    async createUser(payload) {
        const query = `INSERT INTO users SET ?`;
        const [result] = (await db.query(query, payload));
        if (!result) {
            throw new InternalServerException("No user created");
        }
        const user = await this.getUserById("" + result.insertId);
        return user;
    }
    async getUserById(id) {
        const query = `SELECT * FROM users WHERE id = ${id};`;
        const [result] = (await db.query(query));
        if (!result || !result[0]) {
            throw new InternalServerException("No user was found");
        }
        return result;
    }
    async updateUser(id, payload) {
        const query = `with cte as
    (SELECT id FROM users WHERE id = ${id}) 
    UPDATE users
    SET ${payload.first_name ? `first_name = '${payload.first_name}',` : ""} 
    ${payload.last_name ? `last_name = '${payload.last_name}',` : ""} 
    ${payload.title ? `title = '${payload.title}',` : ""} 
    ${payload.email ? `email = '${payload.email}',` : ""} 
    ${payload.dep_id ? `dep_id = '${payload.dep_id}',` : ""} 
    ${payload.image ? `image = '${payload.image}'` : ""} 
    WHERE id IN (SELECT * FROM cte);`;
        const [result] = (await db.query(query));
        if (!result || !result.affectedRows) {
            throw new InternalServerException("No user was updated");
        }
        const user = await this.getUserById(id);
        return user;
    }
    async deleteUser(id) {
        const query = `DELETE FROM users 
                        WHERE id = ${id}`;
        const [result] = (await db.query(query));
        if (!result.affectedRows) {
            throw new InternalServerException("Deletion failed, check parameter value");
        }
    }
    async getAllUsers(filters, isValidFilters) {
        const query = `
    SELECT * FROM users
    ${filters
            ? `WHERE 1=1 
      ${filters.first_name ? `AND first_name LIKE '%${filters.first_name}%'` : ""} 
      ${filters.last_name ? `AND last_name LIKE '%${filters.last_name}'%` : ""} 
      ${filters.title ? `AND title LIKE '%${filters.title}%'` : ""} 
      ${filters.email ? `AND email = '${filters.email}'` : ""} 
      ${filters.dep_id ? `AND dep_id = '${filters.dep_id}'` : ""} 
      ${filters.image ? `AND image = '${filters.image}'` : ""}
        `
            : ""}`;
        const [result] = (await db.query(query));
        if (!result || !result[0]) {
            throw new InternalServerException("No users found");
        }
        return result;
    }
}
const userRepo = new UserRepo();
export default userRepo;
