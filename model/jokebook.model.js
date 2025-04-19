"use strict";

const sqlite3 = require("better-sqlite3");
const db = new sqlite3("./model/db/jokebook.db");

function getAllJokes() {
    const sql = "SELECT * FROM jokes";
    const stmt = db.prepare(sql);
    return stmt.all();
}

function getCategories() {
    const sql = `
        SELECT jokes.setup, jokes.delivery 
        FROM jokes 
        JOIN categories ON jokes.categoryId = categories.id 
        WHERE categories.name = ?
    `;

    if (limit) {
        sql += " LIMIT ?";
        const stmt = db.prepare(sql);
        return stmt.all(category, limit);
    }
    const stmt = db.prepare(sql);
    return stmt.all(category);
}

function getJokeByCategory(category, limit) {
    const sql = `
        SELECT jokes.setup, jokes.delivery 
        FROM jokes 
        JOIN categories ON jokes.categoryId = categories.id 
        WHERE categories.name = ?
    `;

    if (limit) {
        sql += " LIMIT ?";
        const stmt = db.prepare(sql);
        return stmt.all(category, limit);
    }
    const stmt = db.prepare(sql);
    return stmt.all(category);
}

function getRandomJoke() {
    const sql = "SELECT setup, delivery FROM jokes ORDER BY RANDOM() LIMIT 1";
    const stmt = db.prepare(sql);
    return stmt.get();
}

function  addNewJoke(category, setup, delivery) {
    const sql = "INSERT INTO joke (categoryId, setup, delivery) VALUES (?, ?, ?)";
    const stmt = db.prepare(sql);

    const info = stmt.run(categoryId, setup, delivery);
    return info.changes > 0;
}

module.exports = {
    getAllJokes,
    getCategories,
    getJokeByCategory,
    getRandomJoke,
    addNewJoke,
}