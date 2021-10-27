const { getUsersSnapshot } = require("../firebase/db");
const { checkFormValid, verifyToken } = require("../auth");

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

  res
    .status(200)
    .json({ id: user.id, username: user.username, password: user.password });
};
