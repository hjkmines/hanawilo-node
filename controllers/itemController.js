const Item = require('../models/Item');

//For '/' endpoint 
const getItems = async (req, res, next) => {
    //query parameter 
    const filter = {}; 
    const options = {};
    if (Object.keys(req.query).length) {
        const {
            gender, 
            price, 
            isClearance, 
            category, 
            colors, 
            sizes, 
            sortByPrice, 
            limit
        } = req.query

        if (gender) filter.gender = true; 
        if (price) filter.price = true; 
        if (isClearance) filter.isClearance = true;
        if (category) filter.category = true; 
        if (colors) filter.colors = true; 
        if (sizes) filter.sizes = true; 

        if (limit) options.limit = limit; 
        if (sortByPrice) options.sort = {
            price: sortByPrice === 'asc' ? 1 : -1
        }
    }

    try {
        const result = await Item.find({}, filter, options); 

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result);
    } catch (err) {
        throw new Error(`Error retrieving items: ${err.message}`)
    }

}

const postItem = async (req, res, next) => {
    try {
        const result = await Item.create(req.body); 

        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(result);
    } catch (err) {
        throw new Error(`Error posting new item: ${err.message}`); 
    }
}; 

const deleteItems = async (req, res, next) => {
    try {
        await Item.deleteMany(); 

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: 'Successfully deleted all items' })
    } catch (err) {
        throw new Error(`Error deleting all items: ${err.message}`)
    }
}; 

//For '/:itemId' endpoint
const getItem = async (req, res, next) => {
    try {
        const result = await Item.findById(req.params.itemId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } catch (err) {
        throw new Error(`Error : ${err.message}`)
    }
}; 

const updateItem = async (req, res, next) => {
    try {
        const result = await Item.findByIdAndUpdate(req.params.itemId, {
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

const deleteItem = async (req, res, next) => {
    try {
        await Item.findByIdAndDelete(req.params.itemId)

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ sucess: true, msg: `deleted item with item ID of ${req.params.itemId}` });
    } catch (err) {
        throw new Error(`Error : ${err.message}`)
    }

}; 

// For '/:itemId/ratings' endpoint
const getItemRatings = async (req, res, next) => {
    try {
        const result = await Item.findById(req.params.itemId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result.ratings)
    } catch (err) {
        throw new Error(`Error : ${err.message}`)
    }
}; 

const postItemRating = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.itemId)
        item.ratings.push(req.body); 

        const result = await item.save(); 

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } catch (err) {
        throw new Error(`Error : ${err.message}`)
    }
}; 

const deleteItemRatings = async (req, res, next) => {
    try {
        let item = await Item.findById(req.params.itemId);

        //delete all ratings
        item.ratings = [];

        await item.save(); 

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ sucess: true, msg: `deleted all ratings for item ID of ${req.params.itemId}` });
    } catch (err) {
        throw new Error(`Error : ${err.message}`)
    }
}; 

// For '/:itemId/ratings/:ratingId'
const getItemRating = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.itemId); 

        let rating = item.ratings.find(rating => (rating._id).equals(req.params.ratingId));

        if (!rating) rating = { success: false, msg: `No rating found with rating id: ${req.params.ratingId}` }; 

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating)
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateItemRating = async (req, res, next) => {
    try {
        let item = await Item.findById(req.params.itemId); 

        const rating = item.ratings.find(rating => (rating._id).equals(req.params.ratingId));

        if (rating) {
            const ratingIndexPosition = item.ratings.indexOf(rating)
            item.ratings.splice(ratingIndexPosition, 1, req.body) //replace old rating with new updated one
            await item.save(); 
        } else {
            item = { success: false, msg: `No rating found with rating id: ${req.params.ratingId}` }; 
        }

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(item)
    } catch (err) {
        throw new Error(err.message);
    }
};

const deleteItemRating = async (req, res, next) => {
    try {
        let item = await Item.findById(req.params.itemId); 

        let rating = item.ratings.find(rating => (rating._id).equals(req.params.ratingId));

        if (rating) {
            const ratingIndexPosition = item.ratings.indexOf(rating)
            item.ratings.splice(ratingIndexPosition, 1) //remove old rating
            await item.save(); 
        } else {
            item = { success: false, msg: `No rating found with rating id: ${req.params.ratingId}` }; 
        }

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(item)
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    getItems, 
    postItem, 
    deleteItems, 
    getItem, 
    updateItem, 
    deleteItem, 
    getItemRatings, 
    postItemRating, 
    deleteItemRatings, 
    getItemRating, 
    updateItemRating, 
    deleteItemRating
}; 