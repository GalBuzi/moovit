import { db } from "../utils.js";
import { IUserModel, IUsersFilterModel } from "../types/user.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { InternalServerException } from "../exceptions/http.exceptions.js";
import { UserDatabaseActions } from "../types/db.js";

class UserRepo implements UserDatabaseActions {
  async createUser(payload: IUserModel): Promise<IUserModel> {
    const query = `INSERT INTO users SET ?`;
    const [result] = (await db.query(query, payload)) as ResultSetHeader[];
    if (!result) {
      throw new InternalServerException("No user created");
    }

    const user = await this.getUserById("" + result.insertId);
    return user;
  }

  async getUserById(id: string): Promise<IUserModel> {
    const query = `SELECT * FROM users WHERE id = ${id};`;
    const [result] = (await db.query(query)) as RowDataPacket[];

    if (!result || !result[0]) {
      throw new InternalServerException("No user was found");
    }

    return result as IUserModel;
  }

  async updateUser(id: string, payload: IUserModel) {
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

    const [result] = (await db.query(query)) as ResultSetHeader[];
    if (!result || !result.affectedRows) {
      throw new InternalServerException("No user was updated");
    }

    const user = await this.getUserById(id);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const query = `DELETE FROM users 
                        WHERE id = ${id}`;

    const [result] = (await db.query(query)) as RowDataPacket[];
    if (!result.affectedRows) {
      throw new InternalServerException(
        "Deletion failed, check parameter value"
      );
    }
  }

  async getAllUsers(filters: IUsersFilterModel): Promise<IUserModel[]> {
    const query = `
    SELECT * FROM users
    ${
      filters
        ? `WHERE 1=1 
      ${
        filters.first_name
          ? `AND first_name LIKE '%${filters.first_name}%'`
          : ""
      } 
      ${filters.last_name ? `AND last_name LIKE '%${filters.last_name}'%` : ""} 
      ${filters.title ? `AND title LIKE '%${filters.title}%'` : ""} 
      ${filters.email ? `AND email = '${filters.email}'` : ""} 
      ${filters.dep_id ? `AND dep_id = '${filters.dep_id}'` : ""} 
      ${filters.image ? `AND image = '${filters.image}'` : ""}
        `
        : ""
    }`;

    const [result] = (await db.query(query)) as RowDataPacket[];
    if (!result || !result[0]) {
      throw new InternalServerException("No users found");
    }

    return result as IUserModel[];
  }
}

const userRepo = new UserRepo();
export default userRepo;
