const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/post.model");

const getAllUser = async (req, res) => {
  const user = await User.find({});

  return res.status(200).json(user);
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: process.env.SECRET_KEY_EXPIRY }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while signin" });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exist" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password does not match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.SECRET_KEY,
      { expiresIn: process.env.SECRET_KEY_EXPIRY }
    );

    await newUser.save();

    res
      .status(200)
      .json({ message: "User signup successfully", newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while signup" });
  }
};

module.exports = {
  signin,
  signup,
  getAllUser,
};
