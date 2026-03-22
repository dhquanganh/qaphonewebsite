const homeRouter = require('./homeRouter');
const userRoutes = require('./userRoutes');
const loginRouter = require('./loginRouter');
const adminRouter = require('./adminRouter');


function routes(app) {
    app.use('/auth', loginRouter);
    app.use('/admin', adminRouter);
    app.use('/user', userRoutes);
    app.use('/', homeRouter);
}

module.exports = routes;