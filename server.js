const express = require('express'); 
const dotenv = require('dotenv'); 
const logger = require('./middlewares/logger')
const item = require('./routes/item');
const category = require('./routes/category');
const user = require('./routes/user'); 
const morgan = require('morgan'); 
const bodyParser = require('body-parser'); 
const errorHandler = require('./middlewares/error');

dotenv.config({ path: './config/config.env' }); 

const app = express(); 

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// parse application/json
app.use(bodyParser.json())

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
    process.exit(1);
})