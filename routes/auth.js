const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.put("/register", authController.register);

router.post("/login", authController.login);

router.post("/google", authController.google);

router.post("/facebook", authController.facebook);

module.exports = router;
