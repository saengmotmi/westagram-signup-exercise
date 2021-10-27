const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");

const saltRounds = 10;

const generateHash = async (password) => {
  return bcrypt.hash(password, saltRounds);
};

const verifyHash = (plainText, hash) => {
  return bcrypt.compareSync(plainText, hash);
};

const generateToken = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return false;
  }
};

const generateId = () => {
  return nanoid();
};

const checkFormValid = (body) => {
  const checkFormTable = {
    id: (v) => v.length > 5,
    password: (v) => v.length > 5,
  };

  return Object.entries(body).every(([k, v]) => checkFormTable[k]?.(v));
};

module.exports = {
  generateToken,
  generateHash,
  generateId,
  checkFormValid,
  verifyToken,
  verifyHash,
};
