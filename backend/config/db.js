import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  port: Number(process.env.DB_PORT) || 4000,
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 20000,
  ssl: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: true,
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
    console.error(
      "   Check: DB_HOST/DB_USER/DB_PASSWORD/DB_NAME/DB_PORT env vars on Render, " +
        "and that TiDB Cloud's IP Access List allows 0.0.0.0/0 (Render has no static IP).",
    );
  });

export default pool;