// aca va la aplicación express real
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const config = require("./utils/config");
const app = express();
app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use(cors());
mongoose
    .connect(config.MONGODB_URI)
    .then(() => console.log("Connecting to MongoDB..."))
    .catch((error) =>
        console.error(`Error to connecting to database: ${error}`)
    );

module.exports = app;
