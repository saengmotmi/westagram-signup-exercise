const { getUsersSnapshot } = require("../firebase/db");
const { checkFormValid, verifyHash, generateToken } = require("../auth");

module.exports = async (req, res) => {
  const { id, password } = req.body;

  if (!checkFormValid(req.body))
    res.status(400).json({ message: "invalid user input" });

  const db = await getUsersSnapshot();

  const user = Object.entries(db).find(([k, v]) => {
    const isUsernameValid = id === v.username;
    const isPasswordValid = verifyHash(password, v.password);

    return isUsernameValid && isPasswordValid;
  });

  if (user) {
    res
      .status(200)
      .json({ message: "login success", token: generateToken(user.id) });
  } else {
    res.status(400).json({ message: "check username or password" });
  }
};
