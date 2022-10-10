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

router.route('/')
      .get(reqRecievedLogger, getCategories)
      .post(reqRecievedLogger, categoryValidator, postCategory)
      .delete(reqRecievedLogger, deleteCategories)
// why don't we have a put? 

router.route('/:categoryId')
      .get(reqRecievedLogger, getCategory)
      .put(reqRecievedLogger, updateCategory)
      .delete(reqRecievedLogger, deleteCategory)
// why don't we have a post? 

module.exports = router;