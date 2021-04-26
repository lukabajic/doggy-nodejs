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

router.post("/working-day", isAuth, businessController.addWorkingDay);

router.delete(
  "/remove-working-day",
  isAuth,
  businessController.removeWorkingTime
);

router.post("/working-days", isAuth, businessController.addWorkingDays);

module.exports = router;