//For '/' endpoint 
const getItems = (req, res, next) => {
    //query parameter 
    if (Object.keys(req.query).length) {
        const { 
            gender, 
            price, 
            isClearance, 
            colors,
            sizes
         } = req.query; 
        
        const filter = [];  

        if (gender) filter.push(gender);
        if (price) filter.push(price);
        if (isClearance) filter.push(isClearance);
        if (colors) filter.push(colors);
        if (sizes) filter.push(sizes);

        for (const query of filter) {
            console.log(`Searching item by: ${query}`); 
        }
    }

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ sucess: true, msg: 'show me all items' });
}

const postItem = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json({ 
          sucess: true, 
          msg: `create one item with the following attributes: 
          Item Name: ${req.body.itemName}
          Item Description: ${req.body.itemDescription}
          Gender: ${req.body.gender}
          Price: ${req.body.price}
          isClearance: ${req.body.isClearance}
          colors: ${req.body.colors}
          sizes: ${req.body.sizes}
          ` 
    });
}; 

const deleteItems = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: 'delete all items' })
}; 

//For '/:itemId' endpoint
const getItem = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ sucess: true, msg: `show me item with item ID of ${req.params.itemId}` });
}; 

const updateItem = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ sucess: true, msg: `update item with item ID of ${req.params.itemId}` });
}; 

const deleteItem = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ sucess: true, msg: `delete item with item ID of ${req.params.itemId}` });
}; 

module.exports = {
    getItems, 
    postItem, 
    deleteItems, 
    getItem, 
    updateItem, 
    deleteItem
}; 