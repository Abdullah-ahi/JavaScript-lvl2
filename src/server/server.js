const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');
const statistic = require('./statisticRouter')
const app = express();

app.use(express.json());
app.use('/', express.static('./public'));
app.use('/api/cart', cartRouter);
app.use('/api/statistics', statistic)

app.get('/api/products', (req, res)=> {
    fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
        if (err){
            res.send(JSON.stringify({result: 0, text: err}));
        }else{
            res.send(data);
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`Listening ${port} port`);
});