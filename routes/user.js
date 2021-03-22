const express = require("express");

const userController = require("../controllers/user");
const isAuth = require("../utility/isAuth");

const router = express.Router();

router.get("/verify-email/:token", userController.verifyUserEmail);

router.post("/add-animal", isAuth, userController.addAnimal);

router.post("/reset-password", userController.resetPassword);

router.post("/change-password", isAuth, userController.changePassword);

module.exports = router;
