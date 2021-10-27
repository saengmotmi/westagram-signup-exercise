const router = require("express").Router();
const signup = require("./signup");
const login = require("./login");

router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
