const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt"); // Require bcrypt
const dotenv = require("dotenv");
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
    const newUser = new User({name,email, password: hashedPassword});

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
    res.status(200).json({ token });

  } catch (error) {
    console.log("Error logging in user", error);
    res.status(500).send("An error occurred while logging in user");
  }
});
