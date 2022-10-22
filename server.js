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
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet'); 
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

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

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
}); 

app.use(limiter); 

app.use(helmet());

app.use(cors());

app.use(logger);
app.use('/api/v1/item', item);
app.use('/api/v1/category', category);
app.use('/api/v1/user', user);

app.use(errorHandler);

const PORT = process.env.PORT || 5001; 

const server = app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
}); 

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`); 
    server.close(() => process.exit(1));
})