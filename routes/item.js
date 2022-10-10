const express = require('express'); 
const router = express.Router();
const reqRecievedLogger = require('../middlewares/reqRecievedLogger');
const {
      getItems, 
      postItem, 
      deleteItems, 
      getItem, 
      updateItem, 
      deleteItem
} = require('../controllers/itemController'); 
const { itemValidator } = require('../middlewares/utils/validators');

//isClearance is a boolean type
//colors and sizes are arrays
//Price is a Currency type 

router.route('/')
      .get(reqRecievedLogger, getItems)
      .post(reqRecievedLogger, itemValidator, postItem)
      .delete(reqRecievedLogger, deleteItems)
// why don't we have a put? 

router.route('/:itemId')
      .get(reqRecievedLogger, getItem)
      .put(reqRecievedLogger, updateItem)
      .delete(reqRecievedLogger, deleteItem)
// why don't we have a post? 

module.exports = router;