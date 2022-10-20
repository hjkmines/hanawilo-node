const mongoose = require('mongoose'); 
const Schema = mongoose.Schema
const validator = require('validator');

const RatingSchema = new Schema({
    rating: {
        type: Number, 
        min: 1, 
        max: 5, 
        required: true, 
        validate: (value) => {
            return validator.isNumeric(value)
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
        maxLength: [15, 'Item can not be more than 15 characters']
    }, 
    itemDescription: {
        type: String, 
        required: true, 
        maxLength: [15, 'Item can not be more than 15 characters']
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
        validate: (value) => {
            return validator.isNumeric(value)
        }
    }, 
    isClearance: {
        type: Boolean, 
        default: false, 
        validate: (value) => {
            return validator.isBoolean(value)
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

ItemSchema.pre('save', () => {
    this.itemName = this.itemName.trim(); 
    this.itemDescription = this.itemDescription.trim(); 

    next(); 
})

ItemSchema.post('save', () => {
    this.itemName = this.itemName.toUpperCase(); 
    
    next(); 
})

module.exports = mongoose.model('Item', ItemSchema);