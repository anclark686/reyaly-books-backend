const dotenv = require("dotenv")
dotenv.config();

module.exports = {
  HOST: process.env.JAWS_DB_HOST,
  USER: process.env.JAWS_DB_USERNAME,
  PASSWORD: process.env.JAWS_DB_PASSWORD,
  DB: process.env.JAWS_DB_DATABASE,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
