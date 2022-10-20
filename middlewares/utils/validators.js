const categoryValidator = (req, res, next) => {
    if (req.body) {
        if (!req.body.categoryName || !req.body.gender) {
            res
            .status(400)
            .setHeader('Content-Type', 'text/plain')
            .end('Missing required fields!');
        } else {
            next()
        }
    } else {
        res.end(`Request for route path: ${req.protocol} and method: ${req.method} is missing payload`); 
    }
}; 

const itemValidator = (req, res, next) => {
    if (req.body) {
        if (
            !req.body.itemName ||
            !req.body.itemDescription || 
            !req.body.gender ||
            !req.body.price ||
            !req.body.colors ||
            !req.body.sizes
        ) {
            res
            .status(400)
            .setHeader('Content-Type', 'text/plain')
            .end('Missing required fields!');
        } else {
            next()
        }
    } else {
        res.end(`Request for route path: ${req.protocol} and method: ${req.method} is missing payload`); 
    }
}; 

const userValidator = (req, res, next) => {
    if (req.body) {
        if (
            !req.body.userName || 
            !req.body.firstName || 
            !req.body.lastName || 
            !req.body.gender ||
            !req.body.email || 
            !req.body.password
        ) {
            res
            .status(400)
            .setHeader('Content-Type', 'text/plain')
            .end('Missing required fields!');
        } else {
            next()
        }
    } else {
        res.end(`Request for route path: ${req.protocol} and method: ${req.method} is missing payload`); 
    }
}

module.exports = {
    categoryValidator, 
    itemValidator, 
    userValidator
};