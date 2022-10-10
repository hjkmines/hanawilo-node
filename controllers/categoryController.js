
// For '/' endpoint 
const getCategories = (req, res, next) => {
    // query parameter
    if (Object.keys(req.query).length) {
        const category = req.query.category
        console.log(`Searching for category: ${category}`);
    }
    
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ sucess: true, msg: 'show me all categories' });
}; 

const postCategory = (req, res, next) => {
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
};

const deleteCategories = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: 'delete all categories' });
}; 

// For '/:categoryId' endpoint
const getCategory = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ sucess: true, msg: `show me category with category ID of ${req.params.categoryId}` });
}; 

const updateCategory = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ sucess: true, msg: `update category with category ID of ${req.params.categoryId}` });
}; 

const deleteCategory = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ sucess: true, msg: `delete category with category ID of ${req.params.categoryId}` });
}; 

module.exports = {
    getCategories, 
    postCategory, 
    deleteCategories, 
    getCategory, 
    updateCategory, 
    deleteCategory
}; 