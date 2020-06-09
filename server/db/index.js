import dotenv from 'dotenv';
import mysql from 'sequelize';
import logger from '../logger';
import Redis from 'ioredis';
const redis = new Redis({host:'172.17.0.2',port:6379});

dotenv.config();

const Sequelize = mysql.Sequelize;
const { MYSQL_DB_NAME, MYSQL_USERNAME, MYSQL_PASSWORD } = process.env;
const sequelize = new Sequelize(MYSQL_DB_NAME, MYSQL_USERNAME, MYSQL_PASSWORD, {
  dialect: 'mysql',
  host: 'localhost',

})


export default sequelize;
export { redis };