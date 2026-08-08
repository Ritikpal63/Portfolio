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

export const testDBConnection = async () => {
  let connection;

  try {
    connection = await pool.getConnection();

    console.log("✅ MySQL connected successfully");
    console.log("✅ TiDB Connected");

    return true;
  } catch (error) {
    console.error("❌ MySQL connection failed:", error.message);
    return false;
  } finally {
    connection?.release();
  }
};

export default pool;

