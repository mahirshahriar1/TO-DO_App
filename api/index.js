const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt"); // Require bcrypt
const dotenv = require("dotenv");
const moment = require("moment");
dotenv.config();

const app = express();
const port = 3000;
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_CONNECT_URL)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });

app.listen(port, () => {
  console.log(`Server is running on port 3000`);
});

const User = require("./models/user");
const Todo = require("./models/todo");

app.post("/register", async (req, res) => {
  console.log("Registering user");
  try {
    const { name, email, password } = req.body;

    /// check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    res.status(201).send("User registered successfully");
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).send("An error occurred while registering user");
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
  // console.log("Logging in user");
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }
    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid credentials");
    }
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.log("Error logging in user", error);
    res.status(500).send("An error occurred while logging in user");
  }
});

app.post("/todos/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, category } = req.body;
    const newTodo = new Todo({
      title,
      category,
      dueDate: moment().format("DD-MM-YYYY"),
      userId,
    });
    await newTodo.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user?.todos.push(newTodo._id); // ? is used to avoid null pointer exception

    await user.save();

    res.status(200).json({ message: "Todo created successfully", newTodo });
  } catch (error) {
    console.log("Error creating todo", error);
    res.status(500).send("An error occurred while creating todo");
  }
});

app.get("/users/:userId/todos", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("todos");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json({ todos: user.todos });
  } catch (error) {
    console.log("Error fetching todos", error);
    res.status(500).send("An error occurred while fetching todos");
  }
});

app.patch("/todos/:todoId/complete", async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { status: "completed" },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).send("Todo not found");
    }
    res
      .status(200)
      .json({ message: "Todo completed successfully", updatedTodo });
  } catch (error) {
    console.log("Error completing todo", error);
    res.status(500).send("An error occurred while completing todo");
  }
});


app.patch("/todos/:todoId/pending", async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { status: "pending" },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).send("Todo not found");
    }
    res.status(200).json({ message: "Todo pending successfully", updatedTodo });
  } catch (error) {
    console.log("Error pending todo", error);
    res.status(500).send("An error occurred while pending todo");
  }
});
