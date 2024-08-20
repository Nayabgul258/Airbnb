const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listings: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().allow("", null),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        Country: Joi.string().required()
    }).required(),
});

// const Joi = require('joi');

const reviewSchema = Joi.object({
    review: Joi.object({
                rating: Joi.number().required().min(1).max(5),
                Comment: Joi.string().required()
            }).required(),
        })

module.exports.reviewSchema = reviewSchema;









