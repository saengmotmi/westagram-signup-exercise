const { db, ref, update, getUsersSnapshot } = require("../firebase/db");
const {
  generateHash,
  generateToken,
  generateId,
  checkFormValid,
} = require("../auth");

module.exports = async (req, res) => {
  const { id, password } = req.body;

  const isValidUserInfo = checkFormValid(req.body);
  if (!isValidUserInfo) res.status(400).json({ message: "invalid user input" });

  const data = await getUsersSnapshot();

  const isUserAlreadyExist = data[id];

  if (isUserAlreadyExist)
    res.status(400).json({ message: "user already exist" });

  const primaryKey = generateId();

  const userInfo = {
    id: primaryKey,
    username: id,
    password: await generateHash(password),
    created_at: new Date(),
  };

  await update(ref(db, "users/" + id), userInfo);

  res
    .status(200)
    .json({ message: "signup success", token: generateToken(primaryKey) });
};
