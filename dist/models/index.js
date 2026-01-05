"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const db_config_1 = require("../config/db-config");
const sequelize_1 = require("sequelize");
const auth_model_1 = require("./auth.model");
const sequelize = new sequelize_1.Sequelize(db_config_1.dbConfig.database, db_config_1.dbConfig.user, db_config_1.dbConfig.password, {
    host: db_config_1.dbConfig.host,
    dialect: db_config_1.dbConfig.dialect,
});
const db = {
    sequelize,
    Sequelize: sequelize_1.Sequelize,
    auth: (0, auth_model_1.authModel)(sequelize, sequelize_1.DataTypes),
};
exports.db = db;
db.sequelize
    .sync({ force: false })
    .then(() => {
    console.log("Database synchronized successfully!");
})
    .catch((error) => {
    console.error("Error synchronizing database:", error);
});
