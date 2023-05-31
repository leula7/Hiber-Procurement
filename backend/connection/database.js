import Sequelize from 'sequelize';

// Initialize Sequelize with database credentials
const sequelize = new Sequelize('procure', 'root', '', {
  host: 'localhost', // Replace with your database host
  dialect: 'mysql', // Replace with your database dialect (e.g., mysql, postgres, sqlite)
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

  export default sequelize;
