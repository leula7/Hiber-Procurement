import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({path: 'config.env'});
const hosts = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_Name = process.env.DB_Name;
const sequelize = new Sequelize(DB_Name,DB_USER,DB_PASSWORD, {
  host: hosts,
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

  export default sequelize;
