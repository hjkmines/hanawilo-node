const mongoose = require('mongoose'); 
const Schema = mongoose.Schema

const RatingSchema = new Schema({
    rating: {
        type: Number, 
        min: 1, 
        max: 5, 
        required: true, 
        validate: (rating) => {
            return typeof rating === 'number'
        }
    }, 
    text: {
        type: String, 
        required: true
    }, 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const ItemSchema = new Schema({
    itemName: {
        type: String, 
        required: true, 
        maxLength: [100, 'Item can not be more than 15 characters']
    }, 
    itemDescription: {
        type: String, 
        required: true, 
        maxLength: [100, 'Item can not be more than 15 characters']
    }, 
    gender: {
        type: String, 
        required: [true, 'Please add a gender'], 
        enum: [
            'Male', 
            'Female'
        ]
    }, 
    price: {
        type: Number, 
        required: [true, 'Please add a price'], 
        min: 0, 
        validate: (price) => {
            return typeof price === 'number'
        }
    }, 
    isClearance: {
        type: Boolean, 
        default: false, 
        validate: (isClearance) => {
            return typeof isClearance === 'boolean'
        }
    }, 
    colors: {
        type: [String], 
        required: [true, 'Please add colors']
    }, 
    sizes: {
        type: [String], 
        required: [true, 'Please add sizes'], 
        enum: [
            'Small', 
            'Medium', 
            'Large', 
            'X-Large'
        ]
    }, 
    ratings: [RatingSchema]
}, {
    timestamps: true
})

ItemSchema.pre('save', function(next) {
    this.itemName = this.itemName.trim(); 
    this.itemDescription = this.itemDescription.trim(); 

    next(); 
})

ItemSchema.post('save', function(next) {
    this.itemName = this.itemName.toUpperCase(); 
})

module.exports = mongoose.model('Item', ItemSchema);