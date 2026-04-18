const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const bookingController = require("../controllers/booking.js");

// Reserve a listing  POST /listings/:id/reserve
router.post("/reserve", isLoggedIn, wrapAsync(bookingController.createBooking));

module.exports = router;
