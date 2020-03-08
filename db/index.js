const mongoose = require("mongoose");

let mongoConnectUrl =
    process.env.NODE_ENV == "development"
        ? "mongodb://127.0.0.1:27017/simpleCrawler-api"
        : "mongodb://mongodb:27017/simpleCrawler-api";
console.log(process.env.NODE_ENV);

mongoose.connect(
    mongoConnectUrl,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (error, client) => {
        if (error) {
            console.log("unable to connect to database");
            return error;
        }
    }
);
