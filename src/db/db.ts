/* eslint-disable @typescript-eslint/no-unused-vars */
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from './schema'

// const databaseUrl = process.env.DATABASE_URL || "mysql://pakwachfm_pakwachfm:w9E5Tws%3F%3DyQ0@15.204.206.213:3306/pakwachfm_pos"

// const connection1 = await mysql.createConnection(databaseUrl);

const connection = await mysql.createPool({
  host: "15.204.206.213",
  user: "pakwachfm_pakwachfm",
  database: "pakwachfm_pos",
  password: 'w9E5Tws?=yQ0',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 15000,
  queueLimit: 0,
});

export const db = drizzle(connection, {schema, mode: 'default'});

// export const db = drizzle(connection1, {schema, mode: 'default'});
