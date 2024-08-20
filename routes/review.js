const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../Utils/wrapAsync.js");
const ExpressError = require("../Utils/ExpressError.js");
const Listings = require("../models/listing.js");
const Review = require("../models/review.js");
const { validateReview, isLoggedIn,isReviewAuthor } = require("../middleware.js");

const ReviewController = require("../controller/reviews.js");

//Reviews post Route
router.post("/",isLoggedIn,
    validateReview, wrapAsync(ReviewController.createReview));

//delete Review route 
router.delete("/:reviewId",isLoggedIn,
    isReviewAuthor,
     wrapAsync(ReviewController.destroyReview));


module.exports = router;
