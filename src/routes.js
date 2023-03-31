/*
* This file mounts routes for all individual modules
* */

module.exports = function(app){
    app.get('/', (req, res) => {
        res.send('Hello Gantri');
    });

    require('./modules/art/routes')(app);
    require('./modules/users/userRoutes')(app);

}
