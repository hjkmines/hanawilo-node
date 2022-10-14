const User = require('../models/User');
const crypto = require('crypto');

//For '/' endpoint
const getUsers = async (req, res, next) => {
    //query parameter 
    if (Object.keys(req.query).length) {
        const {
            userName, 
            gender, 
            age
        } = req.query

        const filter = []; 

        if (userName) filter.push(userName); 
        if (gender) filter.push(gender); 
        if (age) filter.push(age); 

        for (const query of filter) {
            console.log(`Searching user(s) by: ${query}`)
        }
    }

    try {
        const result = await User.find(); 
    
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } catch (err) {
        throw new Error(`Error getting all users: ${err.message}`)
    }
}; 

const createUser = async (req, res, next) => {
    try {
        const result = await User.create(req.body);

        sendTokenResponse(result, 201, res);
    } catch (err) {
        throw new Error(`Error creating new user: ${err.message}`)
    }
};

const deleteUsers = async (req, res, next) => {
    try {
        await User.deleteMany(); 

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: 'deleted all users!' })
    } catch (err) {
        throw new Error(`Error : ${err.message}`)
    }
    
};

//For '/:userId' endpoint
const getUser = async (req, res, next) => {
    try {
        const result = await User.findById(req.params.userId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } catch (err) {
        throw new Error(`Error : ${err.message}`)
    }
    
}; 

const updateUser = async (req, res, next) => {
    try {
        const result = await User.findByIdAndUpdate(req.params.userId, {
            $set: req.body
        }, { new: true })

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } catch (err) {
        throw new Error(`Error : ${err.message}`)
    }
    
};

const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.userId)

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ sucess: true, msg: `deleted item with user ID of ${req.params.userId}` });
    } catch (err) {
        throw new Error(`Error : ${err.message}`)
    }
    
};

// For '/login' endpoint
const login = async (req, res, next ) => {
    const { email, password } = req.body; 

    if (!email || !password) throw new Error('Please provide a email and password');

    const user = await User.findOne({ email }).select('+password');
    
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await user.matchPassword(password);

    if (!isMatch) throw new Error('Invalid credentials');

    sendTokenResponse(user, 200, res);
}

// For '/forgotPassword' endpoint
const forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) throw new Error('No user found');

    const resetToken = user.getResetPasswordToken(); 

    try {
        await user.save({ validateBeforeSave: false });

        res
        .status(200)
        .json({ 
            success: true, 
            msg: `Password has been reset with token: ${resetToken}` 
        });
    } catch (err) {
        user.resetPasswordToken = undefined; 
        user.resetPasswordExpire = undefined; 

        await user.save({ validateBeforeSave: false }); 

        throw new Error('Email could not be sent');
    }
}

// For '/resetPassword' endpoint
const resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex'); 

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    }); 

    if (!user) throw new Error('Invalid token')

    user.password = req.body.password; 
    user.resetPasswordExpire = undefined; 
    user.resetPasswordToken = undefined; 

    await user.save(); 

    sendTokenResponse(user, 200, res);
}

// For '/updatePassword' endpoint
const updatePassword = async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password'); 

    passwordMatches = await user.matchPassword(req.body.currentPassword);

    if (!passwordMatches) throw new Error('Password is incorrect'); 

    user.password = req.body.newPassword; 
    
    await user.save(); 

    sendTokenResponse(user, 200, res);
}

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken(); 

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000), 
        httpOnly: true 
    }

    if (process.env.NODE_ENV === 'production') options.secure = true;

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token });
} 

module.exports = {
    getUsers, 
    createUser, 
    deleteUsers, 
    getUser, 
    updateUser, 
    deleteUser, 
    login, 
    forgotPassword, 
    resetPassword, 
    updatePassword
};