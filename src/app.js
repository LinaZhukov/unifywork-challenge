/*
* This file creates the express app and mounts all routes.
* @returns Express
* */

const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes')

module.exports = function(){
    try{
        const app = express();
        app.use(bodyParser.json())
        routes(app);
        return app;
    }catch (e){
        console.error(e);
    }
}
