const express = require('express'); 
const router = express.Router();
const reqRecievedLogger = require('../middlewares/reqRecievedLogger');
const {
      getUsers, 
      createUser, 
      deleteUsers, 
      getUser, 
      updateUser, 
      deleteUser, 
      login, 
      forgotPassword, 
      resetPassword, 
      updatePassword,
      logout
} = require('../controllers/userController');
const { 
      userValidator, 
      adminValidator
} = require('../middlewares/utils/validators'); 
const protectedRoute = require('../middlewares/auth');

router.route('/')
      .get(reqRecievedLogger, protectedRoute, adminValidator, getUsers)
      .post(reqRecievedLogger, userValidator, createUser) //register user
      .delete(reqRecievedLogger, protectedRoute, adminValidator, deleteUsers)
// why don't we have a put? 

router.route('/login')
      .post(login)

router.route('/forgotpassword')
      .post(forgotPassword)

router.route('/resetpassword')
      .put(resetPassword)

router.route('/updatepassword')
      .put(protectedRoute, updatePassword)

router.route('/logout')
      .get(protectedRoute, logout)

router.route('/:userId')
      .get(reqRecievedLogger, getUser)
      .put(reqRecievedLogger, protectedRoute, updateUser)
      .delete(reqRecievedLogger, protectedRoute, deleteUser)
// why don't we have a post? 

module.exports = router;