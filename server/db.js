import mysql from "mysql2/promise";

export const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3308,
  database: "skelbimai",
});
