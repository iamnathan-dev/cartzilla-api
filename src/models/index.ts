import { dbConfig } from "../config/db-config";
import { Sequelize, DataTypes } from "sequelize";
import { authModel } from "./auth.model";

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

interface DB {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  auth: ReturnType<typeof authModel>;
}

const db: DB = {
  sequelize,
  Sequelize,
  auth: authModel(sequelize, DataTypes),
};

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synchronized successfully!");
  })
  .catch((error: Error) => {
    console.error("Error synchronizing database:", error);
  });

export { db };
