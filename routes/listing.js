const express = require("express");
const router = express.Router();
const Listings = require("../models/listing.js");
const wrapAsync = require("../Utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const   listingController = require ("../controller/listing.js");
const multer  = require('multer');
const {storage} = require ("../CloudConfig.js");
const upload = multer({ storage });

//Index Route
router.route("/")
  .get(wrapAsync(listingController.index))
  .post( isLoggedIn,
    validateListing,
    upload.single("Listing[image]"),
    wrapAsync(listingController.createNewFrom)
);




//New Route, create route also using get and post 
router.get("/new", isLoggedIn, listingController.showNewListingForm );

//Show Route 
router.get("/:id",
    wrapAsync(listingController.renderShowForm)
);





//edit Route
router.get("/:id/edit", isLoggedIn, isOwner,
    wrapAsync(listingController.editListing)
);


// update Route
router.put("/:id", isLoggedIn, isOwner,
    upload.single("Listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing));


//Delete Route 
router.delete("/:id", isLoggedIn, isOwner,
    validateListing,
    wrapAsync(listingController.deleteListing));

module.exports = router;