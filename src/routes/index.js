const homeRouter = require('./homeRouter');
const userRoutes = require('./userRoutes');
const loginRouter = require('./loginRouter');

function routes(app) {
    // Pages (EJS)
    app.use('/auth', loginRouter);
    app.use('/', homeRouter);

    // API
}

module.exports = routes;