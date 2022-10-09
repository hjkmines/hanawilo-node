const express = require('express'); 
const dotenv = require('dotenv'); 
const logger = require('./middlewares/logger')
const item = require('./routes/item');
const category = require('./routes/category');
const user = require('./routes/user'); 
const morgan = require('morgan'); 

dotenv.config({ path: './config/config.env' }); 

const app = express(); 

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(logger);
app.use('/api/v1/item', item);
app.use('/api/v1/category', category);

const PORT = process.env.PORT || 5001; 

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
}); 