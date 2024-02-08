const express = require("express");
const { signin, signup, getAllUser } = require("../controllers/user.controller");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/all-users", getAllUser);

module.exports = router;
