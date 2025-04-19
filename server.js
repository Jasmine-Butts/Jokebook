"use strict";

const express = require("express");
const app = express();

// importing ejs and setting it as the view engine
const ejs = require("ejs");
app.set("view engine", "ejs");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Redirect root URL to /joke
app.get("/", (req, res) => {
    res.redirect("/joke");
});

const jokeRoutes = require("./router/jokebook.router");
app.use("/joke", jokeRoutes);

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log("App is listening on port " + PORT + "!");
});