const mongoose = require("mongoose");

class AppConfig {
    constructor () {
        this.port = process.env.PORT || 8080;
        this.mongoPort = process.env.MONGO_PORT || 27017;
        this.mongoHost = process.env.MONGO_HOST ||  "localhost";
        this.mongoCollection = process.env.MONGO_COLLECTION || "athletes";
        this.mongoConn = `mongodb://${this.mongoHost}:${this.mongoPort}/${this.mongoCollection}`;
        console.log("Mongo Config", this.mongoConn);
    }
    connectToMongo () {
        // Mongoose still rolls its own promise library and complains about it
        mongoose.Promise = global.Promise;
        // Current version of mongoose also complains about this safe to ignore
        this.mongo = mongoose.connect(this.mongoConn);
        return this.mongo;
    }
    connectToPostgres () {

    }
}

module.exports = new AppConfig();