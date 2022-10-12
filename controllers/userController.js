const User = require('../models/User');

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

        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(result)
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

module.exports = {
    getUsers, 
    createUser, 
    deleteUsers, 
    getUser, 
    updateUser, 
    deleteUser
};