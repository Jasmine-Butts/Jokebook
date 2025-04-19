"use strict";

const express = require("express");
const router = express.Router();

const jokeController = require("../controller/jokebook.controller");

router.get("/", (req, res) => {
    res.redirect("/joke");
});

// get all jokes
router.get("/joke", jokeController.getAllJokes);
// get categories
router.get("/categories", jokeController.getCategories);
// get jokes by category
router.get("/joke/:category", jokeController.getJokeByCategory);
// get a random joke
router.get("/random", jokeController.getRandomJoke);

// add a new joke
router.post("/joke/add", jokeController.addNewJoke);

module.exports = router;

