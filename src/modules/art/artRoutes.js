/*
* This file contains the routes for the art module
* it uses express validator to ensure required params are present
* and loads the art controller
* */

const {param, validationResult} = require('express-validator');
const artController = require('./artController');
const commentController = require('./commentController');

async function getArt(req, res){
    try{
        const result = await artController.getArt();
        return res.json(result);
    }catch (e) {
        console.error(e);
        res.send(500, 'error fetching arts')
    }
}

async function findArt(req, res){
    try{
        const {artId} = req.params;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const art = await artController.findArt({id: artId});
        const comments = await commentController.getComments({artId});

        const result = {
            ...art,
            comments
        }

        return res.json(result);
    }catch (e) {
        console.error(e);
        res.send(500, 'error fetching arts')
    }
}

async function addComment(req, res){
    try{
        const {artId} = req.params;
        const {name, userId, content} = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const result = await commentController.addCommnet({
            artId, name, content, userId
        });

        return res.json(result);
    }catch (e) {
        console.error(e);
        res.send(500, 'error fetching arts')
    }
}



module.exports = function(app){
    app.get('/api/art', getArt);
    app.get('/api/art/:artId', param('artId').isNumeric(), findArt);
    app.post('/api/art/:artId/comments', addComment);
}