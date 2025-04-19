"use strict";

const jokeModel = require("../model/jokebook.model");

function getAllJokes (req, res) {
    try {
        const jokes = jokeModel.getAllJokes();
        const categories = jokeModel.getCategories();
        const randomJoke = jokeModel.getRandomJoke();
        res.render("index", { jokes, categories, randomJoke }); 
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send("Uh-Oh! There was a problem fetching the jokes. Please try again!");
    }   
};

function getCategories() {
    const sql = "SELECT name FROM categories";
    const stmt = db.prepare(sql);
    return stmt.all().map((row) => row.name);
}

function getJokeByCategory (req, res) {
    const category = req.params.category;
    const limit = parseInt(req.query.limit);

    try {
        const jokes = jokeModel.getJokeByCategory(category, limit);
        if (jokes) {
            res.render('jokes_by_category', { category: category, jokes: jokes});
        } else {
            res.status(404).send("No jokes found for this category.");
        }
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send("Uh-Oh! There was a problem fetching the jokes. Please try again!");
    }
};

function getRandomJoke (req, res) {
    try {
        const randomJoke = jokeModel.getRandomJoke();
        const categories = jokeModel.getCategories();
        res.render('index', { randomJoke: randomJoke, categories: categories });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send("Uh-Oh! There was a problem fetching the random joke. Please try again!");
    }
};

function addNewJoke (req, res) {
    const { category, setup, delivery } = req.body;

    if (!category || !setup || !delivery) {
        return res.status(400).send("All fields are required. Please try again.");
    }

    try {
        const categories = jokeModel.getCategories();
        if (!categories.includes(category)) {
            return res.status(400).send("Invalid category. Please try again.");
        }

        const categoryIdSql = "SELECT id FROM categories WHERE name = ?";
        const stmt = db.prepare(categoryIdSql);
        const categoryIdRow = stmt.get(category);
        const categoryId = categoryIdRow ? categoryIdRow.id : null;

        if (!categoryId) {
            return res.status(400).send("Invalid category. Please try again.");
        }

        jokeModel.addNewJoke(categoryId, setup, delivery);
        const updatedJokes = jokeModel.getJokeByCategory(category);
        res.render("jokes_by_category", { category: category, jokes: updatedJokes });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send("Uh-Oh! There was a problem adding the joke. Please try again!");
    }
};

module.exports = {
    getAllJokes,
    getCategories,
    getJokeByCategory,
    getRandomJoke,
    addNewJoke,
};