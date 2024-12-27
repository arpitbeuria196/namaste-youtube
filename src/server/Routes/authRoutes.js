const {register,login,logout} = require("../Controller/authController");
const router = require("express");

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);

module.exports = router;