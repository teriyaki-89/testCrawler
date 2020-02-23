const mongoose = require("mongoose");

mongoose.connect(
    "mongodb://127.0.0.1:27017/simpleCrawler-api",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (error, client) => {
        if (error) {
            console.log("unable to conenct to database");
            return error;
        }
    }
);
