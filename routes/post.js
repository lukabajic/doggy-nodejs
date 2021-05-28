const express = require("express");

const postController = require("../controllers/post");
const isAuth = require("../utility/isAuth");

const router = express.Router();

router.put("/create", isAuth, postController.create);

module.exports = router;
