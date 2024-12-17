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

const conectoToDb = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log("Connecting to MongoDB...");
    } catch (error) {
        console.log(error);
    }
};

conectoToDb();

module.exports = app;
