const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
var methodOverride = require('method-override')
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const setUserMiddleware = require('./middleware/setUserMiddleware');
const routes = require('./routes');
dotenv.config();

const app = express();

// Views (EJS + layouts)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Global middlewares
app.use(helmet());
app.use(methodOverride('_method'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);
app.use(setUserMiddleware);
app.use(express.static(path.join(__dirname, 'public')));


// API routes
routes(app);

// Error handler (last)
app.use(errorHandler);

module.exports = app;

