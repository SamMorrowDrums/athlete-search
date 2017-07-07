// Vendor
const express = require("express"),
    mongoose = require("mongoose");

// Local
const config = require("./config");
const records = require("./src/routes/records.routes.js");

config.connectToMongo();

const app = express();
records(app);
app.listen(config.port)
console.log("App listening on:", config.port);

app.get("/", (req, res) => {
    res.send(`
        <HTML />
        <head></head>
        <body>
        <h1>Young Athlete Data Search</h1>
        <h3>Apologies for the appalling splash page<h1>
        <ul>
            <li><a href="/records/search?name=st">?name=</a></li>
            <li><a href="/records/search?name=Phebe%20Heldt&strict=true">strict=true</a> - affects name search</li>
            <li><a href="/records/search?minAge=16&maxAge=20">minAge=16&maxAge=20=</a></li>
            <li><a href="/records/search?skills=tennis,baseball,water%20sports">?skills=tennis,baseball,water%20sports=</a></li>
            <li><a href="/records/search?limit=1">?limit=1</a></li>
        </ul>
        <p>Try them <a href="/records/search?name=st&minAge=16&maxAge=20&skills=extreme%20sports&limit=10">all out together!</a></p>
        <body>
`)
});
