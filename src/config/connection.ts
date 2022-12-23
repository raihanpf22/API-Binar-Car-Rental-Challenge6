import { Sequelize } from "sequelize-typescript";
import { Car } from "../../db/models/Car";
import { User } from "../../db/models/User";
import * as dotenv from "dotenv";

dotenv.config();

const connection = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User, Car],
});

export default connection;
