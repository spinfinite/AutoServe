// Serve HTML

const express = require('express')
const cors = require('cors')  
const path = require('path')
// const productsDB = require('./productdb.json')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static(`public`))

let {
    getProducts
} = require(`./controller.js`)

// Base End Point
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
})
app.get('/api/products', getProducts)

app.listen(4000, () => console.log(`App running on 4000`))