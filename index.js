const express = require("express");

require("./db/index");

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());

const router = require("./routers/index.js");

app.use(router);

app.listen(port, () => {
    console.log("server is up on port " + port);
});
