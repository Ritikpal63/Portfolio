import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: {
    minVersion: "TLSv1.2",
  },
};

const pool = mysql.createPool(dbConfig);

pool
  .getConnection()
  .then((conn) => {
    console.log("✅ MySQL connected successfully");
    console.log("✅ TiDB Connected");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ MySQL connection failed:", err.message);
  });

export default pool;
