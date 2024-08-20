const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: String,

    image: {
       filename: String,
       url:String,
    },
    price: Number,
    location: String,
    country: String,
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },

});

listingSchema.post("findOneAndDelete", async (Listings) => {
    if (Listings) {
        await Review.deleteMany({ _id: { $in: Listings.review } });
    }

});


const Listings = mongoose.model("Listing", listingSchema);
module.exports = Listings;