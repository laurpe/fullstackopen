const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  expect(titles).toContain("Go To Statement Considered Harmful");
});

test("blogs have id field and it is in form of id not _id", async () => {
  const response = await api.get("/api/blogs");

  const ids = response.body.map((r) => r.id);

  expect(response.body[0]).toHaveProperty("id");
  expect(ids).toBeDefined();
});

test("when blog is added number of blogs is increased by one and blogs contain new title", async () => {
  const newBlog = {
    title: "testiblogi",
    author: "testaaja",
    url: "www.testi.fi",
    likes: "5",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const titles = blogsAtEnd.map((r) => r.title);

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(titles).toContain("testiblogi");
});

test("if blog object doesn't have likes property, set it to 0", async () => {
  const newBlog = {
    title: "likeless blog",
    author: "author",
    url: "nolikes.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd[2]).toHaveProperty("likes");
});

afterAll(() => {
  mongoose.connection.close();
});
