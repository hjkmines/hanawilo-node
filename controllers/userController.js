const User = require('../models/User');

//For '/' endpoint
const getUsers = async (req, res, next) => {
    //query parameter 
    const filter = {};
    const options = {}; 
    if (Object.keys(req.query).length) {
        const {
            userName, 
            gender, 
            limit, 
            sortByAge
        } = req.query

        if (userName) filter.userName = true 
        if (gender) filter.gender = true

        if (limit) options.limit = limit; 
        if (sortByAge) options.sort = {
            firstName: sortByAge === 'asc' ? 1 : -1 
        }
    }

    try {
        const result = await User.find({}, filter, options).exec()
    
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
        }, { new: true, runValidators: true })

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