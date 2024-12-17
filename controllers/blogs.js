const Blog = require("../models/blog");
const blogRouter = require("express").Router();
const logger = require("../utils/logger");
blogRouter.get("/", async (request, response) => {
    try {
        const blogs = await Blog.find({});
        response.json(blogs);
    } catch (error) {
        logger.error(error);
    }
});

blogRouter.post("/", async (request, response) => {
    try {
        const blog = new Blog(request.body);
        const result = await blog.save();
        response.status(201).json(result);
    } catch (error) {
        logger.error(error);
    }
});

module.exports = blogRouter;
