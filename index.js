import express from "express";
const app = express();
import mongoose from 'mongoose';
import dotenv from "dotenv";
import Product from "./models/product.model.js";
dotenv.config();

app.use(express.json())

const port = 5000;

const DBURI = process.env.MONGODB_URI;

mongoose.connect(DBURI)
    .then(() => {
        console.log('Connected To mongoDb')
        app.listen(port, () => {
            console.log("Server is running !", `http://localhost:${port}`)
        })
    }
    );


app.get('/', async (req, res) => {
    res.send('hello world !')
})


// Create products via mongoose schema
app.post('/api/products', async (req, res) => {
    // console.log(req.body)
    // res.send('Testing')
    try {
        const product = await Product.create(req.body);

        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Vew products via mongoose schema
app.get('/api/products', async (req, res) => {
    const products = await Product.find({});
    res.send(products)
});

// Vew products via mongoose schema By its id
app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const productById = await Product.findById(id);
    res.send(productById)
})

// Update products via mongoose schema
app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Product.findByIdAndDelete(id)
        res.send(result)
    } catch (error) {

    }
})


// Update products via mongose By id
app.put('/api/products/:id', async (req, res) => {

    const { id } = req.params;
    const query = req.body;
    const result = await Product.findByIdAndUpdate(id, query);

    const updatedProduct = await Product.findById(id);

    res.send(updatedProduct)
})

