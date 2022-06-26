import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  host: process.env.POSTGRESS_HOST,
  dialect: 'postgres',
  username: process.env.POSTGRESS_USER,
  database: process.env.POSTGRESS_DB,
  password: process.env.POSTGRESS_PASSWORD,
  // logging: process.env.POSTGRESS_LOGGING,
});