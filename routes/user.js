const express = require('express'); 
const router = express.Router();
const reqRecievedLogger = require('../middlewares/reqRecievedLogger');
const {
      getUsers, 
      createUser, 
      deleteUsers, 
      getUser, 
      updateUser, 
      deleteUser
} = require('../controllers/userController');
const { userValidator } = require('../middlewares/utils/validators'); 

//isClearance is a boolean type
//colors and sizes are arrays
//Price is a Currency type 

router.route('/')
      .get(reqRecievedLogger, getUsers)
      .post(reqRecievedLogger, userValidator, createUser)
      .delete(reqRecievedLogger, deleteUsers)
// why don't we have a put? 

router.route('/:userId')
      .get(reqRecievedLogger, getUser)
      .put(reqRecievedLogger, updateUser)
      .delete(reqRecievedLogger, deleteUser)
// why don't we have a post? 

module.exports = router;