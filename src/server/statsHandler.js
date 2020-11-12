const fs = require('fs');
const statistic = require('./statistic');

const actions = {
    writeStats: statistic.writeStats
};

const statsHandler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        }else {
            const newCart = actions[action](JSON.parse(data), req);
            fs.writeFile(file, newCart, (err) => {
                if (err){
                    res.send('{"result": 0}');
                }else {
                    res.send('{"result": 1}')
                }
            })
        }
    });
};

module.exports = statsHandler;