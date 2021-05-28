const express = require("express");

const businessController = require("../controllers/business");
const isAuth = require("../utility/isAuth");

const router = express.Router();

router.put("/create", businessController.createBusiness);

router.get("/get", businessController.getBusiness);

router.get("/get-all", businessController.getAllBusiness);

router.post("/coordinates", businessController.updateCoordinates);

router.post("/comment", isAuth, businessController.addComment);

router.delete("/remove-comment", isAuth, businessController.removeComment);

router.post("/service", isAuth, businessController.addService);

router.delete("/remove-service", isAuth, businessController.removeService);

router.post("/services", isAuth, businessController.addServices);

router.post("/working-hours", isAuth, businessController.addWorkingDay);

router.delete(
  "/remove-working-hours",
  isAuth,
  businessController.removeWorkingTime
);

router.post("/working-hours-week", isAuth, businessController.addWorkingDays);

router.post("/recommended", isAuth, businessController.addRecommended);

module.exports = router;
