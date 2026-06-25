import { Sequelize } from 'sequelize';
 const sequelize = new Sequelize ('movies', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
 });