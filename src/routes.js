/*
* This file mounts routes for all individual modules
* */

module.exports = function(app){
    app.get('/', (req, res) => {res.send('Hello Gantri');});

    require('./modules/art/artRoutes')(app);
    require('./modules/users/userRoutes')(app);
}
