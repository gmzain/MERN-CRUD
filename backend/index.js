import express, { json, urlencoded } from 'express'
import cors from 'cors'

let app = express()
app.use(cors())
app.use(json())
app.use(urlencoded())

let products = []

app.get('/get-products' , (req , res) => {
    res.send(products)
})

app.post('/add-products' , (req , res) => {
    const {name , price , color} = req.body
    products.push({id : Date.now() , name , price , color})

    res.send("product added")
})

app.put('/update-products/:id' , (req , res) => {
    const {name , price , color } = req.body
    const {id} = req.params
    const findProduct = products.find((item) => {
        return item.id == id
    })
    findProduct.name = name
    findProduct.price = price
    findProduct.color = color

    res.send("Product updated successfully");
})

app.delete('/delete-products/:id' , (req , res) => {
    const {id} = req.params
    products = products.filter((item , index) => {
        return item.id != id
    })
    res.send("Product Delete")
})


app.listen(5174 , () => {
    console.log("server is running at port : 5174")
})