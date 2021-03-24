const jwt = require("jsonwebtoken")
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");


blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 }).populate("comment", { content: 1 });

  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" })
  }

  const user = await User.findById(decodedToken.id)

  if (body.title === undefined) {
    return response.status(400).json({ error: "title missing" });
  }

  if (body.url === undefined) {
    return response.status(400).json({ error: "url missing" });
  }

  if (user === null) {
    throw new Error("user id not found")
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)

  const comment = new Comment({
    content: body.content,
    blog: blog._id
  });

  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.json(savedComment);
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" })
  }

  const blog = await Blog.findById(request.params.id)
  const user = await User.findById(decodedToken.id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end();
  } else {
    response.status(401).json({ error: "tokens not matching" })
  }

});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.json(updatedBlog);
});

module.exports = blogsRouter;
