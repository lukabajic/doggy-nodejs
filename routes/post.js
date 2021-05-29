const express = require("express");

const postController = require("../controllers/post");
const isAuth = require("../utility/isAuth");

const router = express.Router();

router.post("/create", isAuth, postController.create);

router.post("/like", isAuth, postController.like);

router.get("/all", isAuth, postController.fetchPosts);

module.exports = router;
