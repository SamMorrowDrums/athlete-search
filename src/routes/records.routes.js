const record = require("../controllers/records.controller.js");

module.exports = (app) => {
    app.route("/records/search")
        .get(record.getCategoryData, record.runSearch, record.runQuery);
};