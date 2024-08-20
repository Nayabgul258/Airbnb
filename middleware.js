const Listings = require("./models/listing.js");
const ExpressError = require("./Utils/ExpressError.js");
const { listingSchema ,reviewSchema } = require("./Schema.js");
const Review = require("./models/review.js");


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in");
        return res.redirect("/login");
    } next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params; 
    let listing = await Listings.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
      req.flash("error","You are not the owner of this listing");
      return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId} = req.params; 
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
      req.flash("error","You are not the author of this listing");
      return res.redirect(`/listings/${id}`);
    }
    next();
};



module.exports.validateListing = (req, res, next) => {
    let { Error } = listingSchema.validate(req.body);
    if (Error) {
        let errMsg = Error.details.map((el) => el.message).join(",");
        throw new ExpressError(Error, 400);

    } else {
        next();
    }
}


module.exports.validateReview = (req, res, next) => {
    let { Error } = reviewSchema.validate(req.body);
    if (Error) {
        let errMsg = Error.details.map((el) => el.message).join(",");
        throw new ExpressError(errMsg, 400);

    } else {
        next();
    }
};