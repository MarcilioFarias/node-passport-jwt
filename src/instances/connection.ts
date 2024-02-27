import {Sequelize} from 'Sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DATABASE_NAME as string,
    process.env.DATABASE_USER as string,
    process.env.DATABASE_PASSWORD as string,
    {
        dialect: 'mariadb',
        port: parseInt(process.env.DATABASE_PORT as string)
    }
);