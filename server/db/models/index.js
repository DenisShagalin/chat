'use strict';
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: false,
  });

const tryConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:');
  }
}
tryConnection();
  
const db = {};

fs
  .readdirSync(__dirname + '/baseModels')
  .filter((file) => {
    return (file.indexOf(".") !== 0) && (file !== "index.js") && (file !== "migrations") && (file !== "redshift-migrations");
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname + '/baseModels', file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

module.exports = db;
