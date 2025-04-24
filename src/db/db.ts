/* eslint-disable @typescript-eslint/no-unused-vars */
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from './schema'

const connection = await mysql.createPool({
  host: "pakwachfm.com",
  user: "pakwachfm_pakwachfm",
  database: "pakwachfm_pos",
  password: 'w9E5Tws?=yQ0',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10
});

export const db = drizzle(connection, {schema, mode: 'default'});
