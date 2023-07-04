let productsDB = require('./productdb.json')

module.exports = {
    getProducts: (req, res) => {
        res.status(200).send(productsDB)
        console.log(productsDB)
    }





}