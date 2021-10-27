const router = require("express").Router();
const signup = require("./signup");
const login = require("./login");
const profile = require("./profile");

router.post("/login", login);
router.post("/signup", signup);
router.post("/profile", profile);

module.exports = router;
