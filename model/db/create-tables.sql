-- This file contains the SQL commands to create the tables for the jokes database.
-- The database consists of two tables: categories and jokes.

CREATE TABLE IF NOT EXISTS "categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS "jokes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL, 
    "setup" TEXT NOT NULL, 
    "delivery" TEXT NOT NULL,
    FOREIGN KEY("categoryId") REFERENCES "categories"("id")
);

