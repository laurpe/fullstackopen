const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const mongoose = require('mongoose');

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;

  if (body.password === undefined) {
    throw new Error("no password given")
  }

  if (body.password.length < 3) {
    throw new Error("password too short")
  }

  const passwordHash = await bcrypt.hash(body.password, 10);

  
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

module.exports = usersRouter;
