const { test, after, describe, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const config = require("../utils/config");
const assert = require("node:assert");
const Blog = require("../models/blog");
const api = supertest(app);

// mongoose.connect(config.MONGODB_URI).catch((error) => console.error(error));

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
    },
];

beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(blogs[0]);
    await blogObject.save();
    blogObject = new Blog(blogs[1]);
    await blogObject.save();
});

describe("API tests", () => {
    test("blogs are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("These are a two blogs", async () => {
        const response = await api.get("/api/blogs");
        assert.strictEqual(response.body.length, 2);
    });

    test("The first blog is about React patterns", async () => {
        const response = await api.get("/api/blogs");
        const titles = response.body.map((e) => e.title);
        assert(titles.includes("React patterns"));
    });

    test("property identifier call 'id' and not '_id'", async () => {
        const response = await api.get("/api/blogs");
        const identifier = Object.keys(response.body[0]);
        assert(identifier.includes("id"));
    });

    test("create a new blog POST METHOD", async () => {
        const totalBlogs = (await Blog.find({})).length + 1;
        await api
            .post("/api/blogs")
            .send({ title: "test" })
            .expect("Content-Type", /json/)
            .expect(201);
        const currentBlogs = await Blog.find({});

        assert.strictEqual(totalBlogs, currentBlogs.length);
    });

    test("check that if the 'likes' property is missing from the request, it will default to 0.", async () => {
        const response = await api
            .post("/api/blogs")
            .send({ title: "test" })
            .expect(201);
        assert.strictEqual(response.body.likes, 0);
    });

    test("check that if the properties 'title' and 'url' are missing, it will response with code status 400", async () => {
        await api.post("/api/blogs").send({ likes: 2 }).expect(400);
    });
});

after(async () => {
    await mongoose.connection.close();
});
