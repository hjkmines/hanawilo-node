const express = require('express'); 
const router = express.Router(); 
const reqRecievedLogger = require('../middlewares/reqRecievedLogger'); 
const { 
      getCategories, 
      postCategory, 
      deleteCategories, 
      getCategory, 
      updateCategory, 
      deleteCategory
} = require('../controllers/categoryController'); 
const { categoryValidator } = require('../middlewares/utils/validators'); 
const protectedRoute = require('../middlewares/auth');

router.route('/')
      .get(reqRecievedLogger, getCategories)
      .post(reqRecievedLogger, protectedRoute, categoryValidator, postCategory)
      .delete(reqRecievedLogger, protectedRoute, deleteCategories)
// why don't we have a put? 

router.route('/:categoryId')
      .get(reqRecievedLogger, getCategory)
      .put(reqRecievedLogger, protectedRoute, updateCategory)
      .delete(reqRecievedLogger, protectedRoute, deleteCategory)
// why don't we have a post? 

module.exports = router;