const { getUsersSnapshot } = require("../firebase/db");
const { checkFormValid, verifyToken, verifyHash } = require("../auth");

module.exports = async (req, res) => {
  const { id, password } = req.body;
  const { authorization } = req.headers;

  if (!authorization) res.status(400).json({ message: "token is required" });

  const jwt = await verifyToken(authorization);
  if (!jwt) res.status(400).json({ message: "jwt is invalid" });

  if (!checkFormValid(req.body))
    res.status(400).json({ message: "invalid user input" });

  const db = await getUsersSnapshot();

  const [_, user] = Object.entries(db).find(([k, v]) => {
    return v.id === jwt.data;
  });

  const isUsernameValid = id === user.username;
  const isPasswordValid = await verifyHash(password, user.password);

  if (isUsernameValid && isPasswordValid) {
    res.status(200).json({ message: "login success" });
  } else {
    res.status(400).json({ message: "check username or password" });
  }
};
