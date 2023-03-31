module.exports = function(app){
    /*
    - /api/users - POST, create user
    - /api/users - GET, see all users
    * */

    app.get('/api/users', (req, res, next) => {
        return next();
    })

    app.post('/api/users', (req, res, next) => {
        return next();
    })
}