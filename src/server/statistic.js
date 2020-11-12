const moment = require('moment')

const writeStats = (stats, req) => {
    const date = moment().format('MMMM Do YYYY, h:mm:ss a');
    stats.contents.push({
        "action": req.body.action,
        "product_id": req.params.id,
        "product_name": req.body.product_name,
        "Date": req.body.date,
        "server_time": date,
    })
    return JSON.stringify(stats, null, 4)
}

module.exports = {
    writeStats,
}