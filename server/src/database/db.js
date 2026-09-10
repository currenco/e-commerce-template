import pkg from 'pg';
import logger from '../config/logger.js';
const { Client } = pkg;

const database = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

try {
  await database.connect();
  logger.info('Connected to the database successfully');
} catch (error) {
  logger.error('Database connection failed: ', error);
  process.exit(1);
}

export default database;
