/*
* This file contains the routes for the art module
* it uses express validator to ensure required params are present
* and loads the art controller
* */

const {param, validationResult} = require('express-validator');
const artController = require('./artController');
async function getArt(req, res){
    try{
        const result = await artController.getArt();
        return res.json(result?.rows);
    }catch (e) {
        console.error(e);
        res.send(500, 'error fetching arts')
    }
}

async function findArt(req, res){
    try{
        const {artId} = req.params;
        console.log(`finding ${artId}`)

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const result = await artController.findArt({id: artId});
        return res.json(result?.rows);
    }catch (e) {
        console.error(e);
        res.send(500, 'error fetching arts')
    }
}

async function addComment(req, res){

}



module.exports = function(app){
    app.get('/api/art', getArt);
    app.get('/api/art/:artId', param('artId').isNumeric(), findArt);
    app.post('/api/art/:artId/comments', addComment);
}