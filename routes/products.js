var products = {
    getAll: (req, res)=> {
        var allProducts = data;
        res.json(allProducts);
    },

    getOne: function(req, res) {
        var id = req.params.id;
        var product = data[id];
        res.json(product);
    },
    create: (req, res) => {
        var newProduct = req.body;
        data.push(newProduct);
        res.json(newProduct);
    },
    update: (req, res) => {
        var updateProduct = req.body;
        var id = req.params.id;
        data[id] = updateProduct;
        res.json(updateProduct);
    },
    delete: (req, res)=> {
        var id = req.params.id;
        data.splice(id, i);
        res.json(true);
    }
};

var data = [{
    name: 'product 1',
    id: '1'
}, {
    name: 'product 2',
    id: '2'
}, {
    name: 'product 3',
    id: '3'
}];

module.exports = products;
