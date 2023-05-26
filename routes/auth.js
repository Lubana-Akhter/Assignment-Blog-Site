const express = require("express");
const router = express.Router();

// middlewares
const { requireSignin, isAdmin } = require("../middlewares/auth.js");
// controllers
const {
  register,
  login,

} = require("../controllers/auth.js");

router.post("/register", register);
router.post("/login", login);
router.get("/auth-check", requireSignin, (req, res) => {
  res.json({ status: "ok" })
})



module.exports = router;
