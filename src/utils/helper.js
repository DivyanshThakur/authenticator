import JSONdb from "simple-json-db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "./config.js";

const db = new JSONdb("db.json");

const initDB = () => {
  if (!db.has("users")) {
    db.set("users", []);
  }
};

export const create = (data) => {
  initDB();

  const users = db.get("users");

  users.push(data);
  db.set("users", users);
};

export const findOne = (username) => {
  initDB();

  const users = db.get("users");

  const user = users.find((userInfo) => userInfo.username === username);

  return user;
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const matchPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const getToken = (user) => {
  return jwt.sign(
    { username: user.username, firstname: user.firstname },
    config.ACCESS_TOKEN_SECRET,
    {
      expiresIn: config.ACCESS_TOKEN_EXPIRE,
    }
  );
};
