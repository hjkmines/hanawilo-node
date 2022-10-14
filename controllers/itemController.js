const Item = require('../models/Item');
const path = require('path');

//For '/' endpoint 
const getItems = async (req, res, next) => {
    //query parameter 
    if (Object.keys(req.query).length) {
        const { 
            gender, 
            price, 
            isClearance, 
            category, 
            colors,
            sizes
         } = req.query; 
        
        const filter = [];  

        if (gender) filter.push(gender);
        if (price) filter.push(price);
        if (isClearance) filter.push(isClearance);
        if (category) filter.push(category);
        if (colors) filter.push(colors);
        if (sizes) filter.push(sizes);

        for (const query of filter) {
            console.log(`Searching item by: ${query}`); 
        }
    }

    try {
        const result = await Item.find().populate('ratings.author'); 

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

        const result = await result.save(); 

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

// For '/:itemId/image' endpoint 
const postItemImage = async (req, res, next) => {
    if (!req.files) throw new Error('Missing image!'); 

    const file = req.files.file; 

    if (!file.mimetype.startsWith('image')) throw new Error('Please upload image file type!')

    if (file.size > process.env.MAX_FILE_SIZE) throw new Error(`Image exceeds size of ${process.env.MAX_FILE_SIZE}`)

    file.name = `photo_${path.parse(file.name).ext}`

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) throw new Error('Problem uploading photo');

        await Item.findByIdAndUpdate(req.params.itemId, { image: file.name }); 

        res
        .status(200)
        .json({ success: true, data: file.name })
    })
}

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
    postItemImage
}; 