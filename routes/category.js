const express = require('express'); 
const router = express.Router(); 
const reqRecievedLogger = require('../middlewares/reqRecievedLogger'); 

router.route('/')
      .get(reqRecievedLogger, (req, res, next) => {
            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ sucess: true, msg: 'show me all categories' });
      })
      .post(reqRecievedLogger, (req, res, next) => {
            res
            .status(201)
            .setHeader('Content-Type', 'application/json')
            .json({
                 sucess: true, 
                 msg: `create one category with the following attributes: 
                Category Name: ${req.body.categoryName}
                Gender: ${req.body.gender}
            ` 
        });
      })
      .delete(reqRecievedLogger, (req, res, next) => {
            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ success: true, msg: 'delete all categories' });
      })
// why don't we have a put? 

router.route('/:categoryId')
      .get(reqRecievedLogger, (req, res, next) => {
            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ sucess: true, msg: `show me category with category ID of ${req.params.categoryId}` });
      })
      .put(reqRecievedLogger, (req, res, next) => {
            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ sucess: true, msg: `update category with category ID of ${req.params.categoryId}` });
      })
      .delete(reqRecievedLogger, (req, res, next) => {
            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ sucess: true, msg: `delete category with category ID of ${req.params.categoryId}` });
      })
// why don't we have a post? 

module.exports = router;