const {body, validationResult} = require('express-validator');
const userController = require('./userController');

async function createUser(req, res){
    try{
        const {name, age, location} = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const result = await userController.createUser({name, age, location});
        return res.json(result);

    }catch (e){
        console.error(e);
        res.send(500, 'error creating user')
    }
}

async function getUsers(req, res){
    try{
        const result = await userController.getUsers();
        return res.json(result);
    }catch (e) {
        console.error(e);
        res.send(500, 'error fetching users')
    }
}

module.exports = function(app){
    app.post('/api/users',
        body('name').isLength({min: 1}),
        body('age').isNumeric(),
        body('location').isLength({min: 1}),
        createUser
    );

    app.get('/api/users', getUsers);
}
