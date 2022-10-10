//For '/' endpoint
const getUsers = (req, res, next) => {
    //query parameter 
    if (Object.keys(req.query).length) {
        const {
            userName, 
            gender, 
            age
        } = req.query

        const filter = []; 

        if (userName) filter.push(userName); 
        if (gender) filter.push(gender); 
        if (age) filter.push(age); 

        for (const query of filter) {
            console.log(`Searching user(s) by: ${query}`)
        }
    }

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ sucess: true, msg: 'show me all users' });
}; 

const createUser = (req, res, next) => {
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
          Phone Number: ${req.body.phoneNumber}
          bio: ${req.body.bio}
          age: ${req.body.age}
          ` 
    });
};

const deleteUsers = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: 'delete all users' })
};

//For '/:userId' endpoint
const getUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ sucess: true, msg: `show me user with user ID of ${req.params.userId}` });
}; 

const updateUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ sucess: true, msg: `update item with user ID of ${req.params.userId}` });
};

const deleteUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ sucess: true, msg: `delete item with user ID of ${req.params.userId}` });
};

module.exports = {
    getUsers, 
    createUser, 
    deleteUsers, 
    getUser, 
    updateUser, 
    deleteUser
};