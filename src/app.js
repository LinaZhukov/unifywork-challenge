
const express = require('express');

module.exports = function(){
    try{
        const app = express();
        return app;
    }catch (e){
        console.error(e);
    }
}
