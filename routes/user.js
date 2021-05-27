const express = require("express");

const userController = require("../controllers/user");
const isAuth = require("../utility/isAuth");

const router = express.Router();

router.get("/verify-email/:token", userController.verifyUserEmail);

router.post("/add-dog", isAuth, userController.addDog);

router.post("/reset-password", userController.resetPassword);

router.post("/change-password", isAuth, userController.changePassword);

router.get("/get", isAuth, userController.getUser);

router.get("/get-all", isAuth, userController.getAllUsers);

module.exports = router;
