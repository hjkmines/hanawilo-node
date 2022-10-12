const Item = require('../models/Item');

//For '/' endpoint 
const getItems = async (req, res, next) => {
    //query parameter 
    if (Object.keys(req.query).length) {
        const { 
            gender, 
            price, 
            isClearance, 
            category, 
            color,
            size
         } = req.query; 
        
        const filter = [];  

        if (gender) filter.push(gender);
        if (price) filter.push(price);
        if (isClearance) filter.push(isClearance);
        if (category) filter.push(category);
        if (color) filter.push(color);
        if (size) filter.push(size);

        for (const query of filter) {
            console.log(`Searching item by: ${query}`); 
        }
    }

    try {
        const result = await Item.find(); 

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
        }, { new: true })

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

module.exports = {
    getItems, 
    postItem, 
    deleteItems, 
    getItem, 
    updateItem, 
    deleteItem
}; 