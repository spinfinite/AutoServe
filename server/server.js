// Serve HTML

const express = require('express')
const cors = require('cors')  
const path = require('path')

const app = express()

app.use(express.json)
app.use(cors())
app.use(express.static('${__dirname}/public'))

let {
    getProducts
} = require(`./controller.js`)

// Base End Point
app.get(`/api/products`, getProducts)

app.listen(4000, () => console.log(`App running on 4000`))