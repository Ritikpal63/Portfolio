-- Database banao (agar pehle se nahi hai to)
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- Contact form submissions store karne ke liye table
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
