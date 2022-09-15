const mongoose = require('mongoose');

//review, rating, createdAt, ref to tour, ref to user

const reviewSchema= new mongoose.Schema({
    review:{
        type: String,
        trim: true,
        require:[true, 'Review can not be empty!']
    },
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    createdAt:{
        type: Date,
        default:Date.now()
    }
});

const Review=mongoose.model('Review',reviewSchema);
module.exports=Review;