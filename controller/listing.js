const Listings = require("../models/listing.js");

//Index Route 
module.exports.index = async (req, res) => {
    const allListings = await Listings.find({});
    res.render("listings/index.ejs", { allListings });
};

//New Route
module.exports.showNewListingForm = (req, res) => {
    res.render("listings/new.ejs");
};
//Show Route 
module.exports.renderShowForm = async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listings.findById(id)
        .populate({
            path: "review",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/ShowRoute.ejs", { listing });
};


//crate Route
module.exports.createNewFrom = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, "...", filename);
    const newListing = new Listings(req.body.Listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");

};


//edit Route
module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listings.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_250,w_300");
    res.render("listings/EditRoute.ejs", { listing, originalImageUrl });
};
// update Route
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listings.findByIdAndUpdate(id, { ...req.body.Listing });
    if (typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", " Listing Edited");
    res.redirect("/listings");
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listings.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success", "Listing Deleted ");
    res.redirect("/listings");
};