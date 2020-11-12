const express = require('express');
const fs = require('fs');
const statsHandler = require('./statsHandler');
const router = express.Router();

router.get('/', (req, res)=> {
    fs.readFile('./server/db/stats.json', 'utf-8', (err, data)=> {
        if (err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        }else {
            res.send(data);
        }
    });
});

router.post('/:id', (req, res) => {
    statsHandler(req, res, 'writeStats', './server/db/stats.json');
});

module.exports = router