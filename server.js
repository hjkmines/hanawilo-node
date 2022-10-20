const express = require('express'); 
const dotenv = require('dotenv'); 
const logger = require('./middlewares/logger')
const item = require('./routes/item');
const category = require('./routes/category');
const user = require('./routes/user'); 
const morgan = require('morgan'); 
const bodyParser = require('body-parser'); 
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error'); 
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');

dotenv.config({ path: './config/config.env' }); 

connectDB();

const app = express(); 

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// parse application/json
app.use(bodyParser.json())

//parse cookies
app.use(cookieParser());

//file upload middleware
app.use(fileupload());

app.use(logger);
app.use('/api/v1/item', item);
app.use('/api/v1/category', category);
app.use('/api/v1/user', user);

app.use(errorHandler);

const PORT = process.env.PORT || 5001; 

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
}); 

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`); 
    process.exit(1)
})