const Record = require("../models/records.mongo.model.js");
const Category = require("../models/categories.mongo.model.js");
const JSONStream = require("JSONStream");

class SearchQuery {

    constructor () {

    }

    addNameQuery (partialName, strict=false) {
        if (partialName) {
            this.name = strict ? partialName : new RegExp(partialName);
        }
        return this;
    }

    addBirthdateQuery (age, type) {
        if (age !== undefined) {
            this.birthdate = this.birthdate || {};
            const date = new Date();
            date.setYear(new Date().getYear() - age);
            this.birthdate[type] = date;
        }
        return this
    }

    addSkillsQuery (skills) {
        if (skills) {
            skills = Array.isArray(skills) ? skills : skills.split(",");
            this.skills = {$in: skills};
        }
        return this;
    }

    addProfessionalExperience (years, type) {
        if (years) {
            const n = Number(years);
            this.experience = {type: years};
        }
        return this;
    }
}

function fetchCategoryData (categories) {
    if (categories) {
        categories = Array.isArray(categories) ? categories : categories.split(",");
        return Category.find({name: {$in: categories}}).exec()
            .then((d) => {
                const out = d.reduce((arr, d) => {
                    arr = arr.concat(d.skills);
                    return arr;
                }, categories);
                return Array.from(new Set(out));
            }).catch(() => {
                return categories;
            });
    }
    return Promise.resolve(categories);
}

function getCategoryData (req, res, next) {
    const {skills} = req.query;
    fetchCategoryData(skills).then((s) => {
        req.skills = s;
    });
    next();
}

function runSearch (req, res, next) {
    const {minAge, maxAge, name, strict, experience} = req.query;
    const q = new SearchQuery().addNameQuery(name, strict === "true")
        .addBirthdateQuery(minAge, "$gte")
        .addBirthdateQuery(maxAge, "$lte")
        .addSkillsQuery(req.skills)
        .addProfessionalExperience(experience, "$gte");
    req.q = q;
    next();
}

function runQuery (req, res) {
    const limit = Number(req.query.limit || 100);
    res.set('Content-Type', 'application/json');
    Record.find(req.q)
        .cursor({limit})
        .pipe(JSONStream.stringify())
        .pipe(res);
}

module.exports.getCategoryData = getCategoryData;
module.exports.runSearch = runSearch;
module.exports.runQuery = runQuery;
