import { Sequelize } from "sequelize";

const db = new Sequelize("Node", "root", "admin123", {
  host: "localhost",
  dialect: "mysql"
  //logging:false
});

export default db;
