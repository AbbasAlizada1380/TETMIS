// config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'TETproject',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'Abbasjan123@',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

export default sequelize;
