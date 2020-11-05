const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

describe("when there are initially some blogs saved", () => {
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

  describe("when a new blog is added", () => {
    test("the number of blogs is increased by one and blogs contain new title", async () => {
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

    test("if likes property is not given, likes are set to 0", async () => {
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

      expect(blogsAtEnd[blogsAtEnd.length - 1]).toHaveProperty("likes", 0);
    });

    test("blog without url and title is not added", async () => {
      const newBlog = {
        author: "author",
        likes: 5,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });
  });

  describe("deleting a blog", () => {
    test("succeeds with status code 204", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

      const titles = blogsAtEnd.map((r) => r.title);

      expect(titles).not.toContain(blogToDelete.title);
    });
  });

  describe("updating a blog", () => {
    test("succeeds with status code 200", async () => {
      const blogsAtStart = await helper.blogsInDb();

      const blogToUpdate = blogsAtStart[0];

      const updatedBlog = {
        title: blogsAtStart[0].title,
        author: blogsAtStart[0].author,
        url: blogsAtStart[0].url,
        likes: 500,
      };

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200);

      const blogsAtEnd = await helper.blogsInDb();

      const titles = blogsAtEnd.map((r) => r.title);

      expect(titles).toContain(updatedBlog.title);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
