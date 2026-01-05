import dotenv from "dotenv";
import { Dialect } from "sequelize";
dotenv.config();

interface DBConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  dialect: Dialect;
}

export const dbConfig: DBConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "test",
  dialect: "postgres",
};
