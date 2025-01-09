const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Basket = require("../models/Basket");
const JWT_SECRET = "test";

async function getUsers() {
  const users = await User.find();
  return users;
}

async function registerUser(email, password) {
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new Error("Пользователь уже существует");
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: passwordHash });
    const basket = await Basket.create({user_id: user._id})
    return jwt.sign(
      {
        email,
        id: user._id,
        name: user.name,
        country: user.country,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "10d",
      }
    );
  }
}
async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Пользователь не найден");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Неправильный пароль");
  }
  return jwt.sign(
    {
      email,
      id: user._id,
      name: user.name,
      country: user.country,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "10d",
    }
  );
}

async function addInfoUser(userId, name, country) {
  const updatedUser = await User.updateOne({ _id: userId }, { name, country });
  const user = await User.findOne({ _id: userId });
  if (!updatedUser) {
    throw new Error("Пользователь не найден");
  }

  return jwt.sign(
    {
      email: user.email,
      id: user._id,
      name: user.name,
      country: user.country,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "10d",
    }
  );
}




module.exports = { getUsers, registerUser, loginUser, addInfoUser };
