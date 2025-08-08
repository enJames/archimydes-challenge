import { Sequelize } from 'sequelize';
import config from './config';

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } = config;
console.log({ DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT });
const sequelize = new Sequelize(
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
  }
);

export default sequelize;
