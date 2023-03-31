module.exports = function(app){
    /*
    - /api/art - GET, view the entire art data set
    - /api/art/ID - GET, view art data by ID
    - /api/art/ID/comments - POST, add a comment for an art data entry
    * */

    app.get('/api/art', (req, res, next) => {
        res.json({arts:[]})
        return next();
    })

    app.get('/api/art/:artId', (req, res, next) => {
        return next();
    })

    app.post('/api/art/:artId/comments', (req, res, next) => {
        return next();
    })

}