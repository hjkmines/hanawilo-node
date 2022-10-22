const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validator = require('validator');

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
        unique: true, 
        validate: (email) => {
            return validator.isEmail(email)
        }
    }, 
    password: {
        type: String, 
        required: [true, 'Please add a password'], 
        validate: (password) => {
            return validator.isStrongPassword(password)
        }
    }, 
    resetPasswordToken: {
        type: String
    }, 
    resetPasswordExpire: {
        type: Date
    },
    admin: {
        type: Boolean, 
        default: false
    }
}, {
    timestamps: true
})

// bcrypt
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt); 
})

UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

UserSchema.methods.matchPassword = function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); 
}

UserSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex'); 

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; 

    return resetToken; 
}

module.exports = mongoose.model('User', UserSchema);
