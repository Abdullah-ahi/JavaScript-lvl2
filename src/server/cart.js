const { groupCollapsed } = require("console");

const add = (cart, req) => {
    cart.contents.push(req.body);
    return JSON.stringify(cart, null, 4);
};

const change = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += 1;
    return JSON.stringify(cart, null, 4);
};

const del = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    if (find.quantity === 1){
        let  idx = cart.contents.indexOf(find)
        cart.contents.splice(idx, 1);
    }else{
        find.quantity -= 1;
    }
    return JSON.stringify(cart, null, 4);
};

const writeAdd = (stats, req) => {
    
    stats.contents.push({"id": req.params.id, "Act": "Добавлено"});
    return JSON.stringify(stats, null, 4);
};

module.exports = {
    del,
    add,
    change,
    writeAdd,
};