const express = require('express'); 
const router = express.Router();
const reqRecievedLogger = require('../middlewares/reqRecievedLogger');
const {
      getItems, 
      postItem, 
      deleteItems, 
      getItem, 
      updateItem, 
      deleteItem, 
      getItemRatings, 
      postItemRating, 
      deleteItemRatings, 
      postItemImage,
      getItemRating, 
      updateItemRating, 
      deleteItemRating
} = require('../controllers/itemController'); 
const { itemValidator } = require('../middlewares/utils/validators');
const protectedRoute = require('../middlewares/auth');

//isClearance is a boolean type
//colors and sizes are arrays
//Price is a Currency type 

router.route('/')
      .get(reqRecievedLogger, getItems)
      .post(reqRecievedLogger, protectedRoute, itemValidator, postItem)
      .delete(reqRecievedLogger, protectedRoute, deleteItems)
// why don't we have a put? 

router.route('/:itemId')
      .get(reqRecievedLogger, getItem)
      .put(reqRecievedLogger, protectedRoute, updateItem)
      .delete(reqRecievedLogger, protectedRoute, deleteItem)
// why don't we have a post? 

router.route('/:itemId/ratings')
      .get(reqRecievedLogger, getItemRatings)
      .post(reqRecievedLogger, protectedRoute, postItemRating)
      .delete(reqRecievedLogger, protectedRoute, deleteItemRatings)

router.route('/:itemId/image')
      .post(reqRecievedLogger, protectedRoute, postItemImage)

router.route('/:itemId/ratings/:ratingId')
      .get(reqRecievedLogger, getItemRating)
      .put(reqRecievedLogger, updateItemRating)
      .delete(reqRecievedLogger, deleteItemRating)

module.exports = router;