const express = require('express'); 
const router = express.Router();
const reqRecievedLogger = require('../middlewares/reqRecievedLogger');

//isClearance is a boolean type
//colors and sizes are arrays
//Price is a Currency type 

router.route('/')
      .get(reqRecievedLogger, (req, res, next) => {
            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ sucess: true, msg: 'show me all items' });
      })
      .post(reqRecievedLogger, (req, res, next) => {
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
                  Category: ${req.body.category}
                  colors: ${req.body.colors}
                  sizes: ${req.body.sizes}
                  ` 
            });
      })
      .delete(reqRecievedLogger, (req, res, next) => {
            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ success: true, msg: 'delete all items' })
      })
// why don't we have a put? 

router.route('/:itemId')
      .get(reqRecievedLogger, (req, res, next) => {
            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ sucess: true, msg: `show me item with item ID of ${req.params.itemId}` });
      })
      .put(reqRecievedLogger, (req, res, next) => {
            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ sucess: true, msg: `update item with item ID of ${req.params.itemId}` });
      })
      .delete(reqRecievedLogger, (req, res, next) => {
            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ sucess: true, msg: `delete item with item ID of ${req.params.itemId}` });
      })
// why don't we have a post? 

module.exports = router;