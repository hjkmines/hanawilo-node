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
            .json({ sucess: true, msg: 'show me all users' });
      })
      .post(reqRecievedLogger, (req, res, next) => {
            res
            .status(201)
            .setHeader('Content-Type', 'application/json')
            .json({ 
                  sucess: true, 
                  msg: `create one user with the following attributes: 
                  User Name: ${req.body.userName}
                  User First Name: ${req.body.userFirstName}
                  User Last Name: ${req.body.userLastName}
                  Gender: ${req.body.gender}
                  Profile Image: ${req.body.profileImage}
                  Email: ${req.body.email}
                  Password: ${req.body.password}
                  Favorites: ${req.body.favorites}
                  bio: ${req.body.bio}
                  age: ${req.body.age}
                  ` 
            });
      })
      .delete(reqRecievedLogger, (req, res, next) => {
            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ success: true, msg: 'delete all users' })
      })
// why don't we have a put? 

router.route('/:userId')
      .get(reqRecievedLogger, (req, res, next) => {
            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ sucess: true, msg: `show me user with user ID of ${req.params.userId}` });
      })
      .put(reqRecievedLogger, (req, res, next) => {
            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ sucess: true, msg: `update item with user ID of ${req.params.userId}` });
      })
      .delete(reqRecievedLogger, (req, res, next) => {
            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ sucess: true, msg: `delete item with user ID of ${req.params.userId}` });
      })
// why don't we have a post? 

module.exports = router;