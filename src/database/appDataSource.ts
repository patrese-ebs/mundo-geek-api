import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Categoria } from "../entities/Categoria.js";
import { Produtos } from "../entities/Produtos.js";

dotenv.config();

export const appDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "database",
    synchronize: true, // Use false in production
    logging: false,
    entities: [Categoria, Produtos],
    migrations: [],
    subscribers: [],
});
