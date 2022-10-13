const mongoose = require('mongoose'); 
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userName: {
        type: String, 
        unique: true, 
        required: [true, 'Please add a user name!'], 
        maxLength: [10, 'User name can not be more than 10 characters']
    }, 
    firstName: {
        type: String, 
        required: [true, 'Please add a first name']
    }, 
    lastName: {
        type: String, 
        required: [true, 'Please add a last name']
    }, 
    gender: {
        type: String, 
        required: [true, 'Please add a gender'], 
        enum: [
            'Male', 
            'Female'
        ]
    }, 
    email: {
        type: String, 
        required: [true, 'Please add a email'], 
        unique: true
    }, 
    password: {
        type: String, 
        required: [true, 'Please add a password']
    }, 
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema);
