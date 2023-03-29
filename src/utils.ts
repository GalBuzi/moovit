import mysql from "mysql2/promise";
import { RowDataPacket } from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export let db: mysql.Connection;

export async function connect(): Promise<mysql.Connection | void> {
  if (db) return db;
  db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    // host: "127.0.0.1",
    // user: "root",
    // password: "rootGal/!18?",
    // database: "appsforce",
  });
  await db.connect();
  console.log("connection succeeded");
}

export async function initDB(): Promise<void> {
  const query = `
            CREATE TABLE IF NOT EXISTS departments
              (id INT AUTO_INCREMENT,
              name VARCHAR(255) NOT NULL CHECK (LENGTH(name) > 1), 
              description VARCHAR(255),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              PRIMARY KEY (id));
                `;


  await db.query(query);

  const query2 = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL CHECK (LENGTH(first_name) > 1),
    last_name VARCHAR(255) NOT NULL  CHECK (LENGTH(last_name) > 1),
    title VARCHAR(255),
    email VARCHAR(255) UNIQUE CHECK (email REGEXP "^[^@]+@[^@]+\.[^@]{2,}$"),
    image VARCHAR(255),
    dep_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (dep_id) REFERENCES departments(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`

    await db.query(query2);
}
