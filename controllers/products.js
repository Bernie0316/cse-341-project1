const Product = require('../models/products');

const getAll =  async(req, res) => {
    //#swagger.tags = ['Products']
    try {
        const products =  await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product', error: err });
    }
};

const createProduct = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        const { name, price, category, stock } = req.body;
        
        if (!name || !price || !category || !stock) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newProduct = new Product({
            name,
            price,
            category,
            stock
        });

        const result = await newProduct.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error creating product', error: err });
    }
};

const updateProduct = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        const productId = req.params.id;
        const result = await Product.findByIdAndUpdate(productId, req.body, { 
            new: true,
            runValidators: true
        });
    if (!result) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error updating product', error: err });
    }
};

const deleteProduct = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        const result = await Product.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(204).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err });
    }
};

module.exports = { getAll, getSingle, createProduct, updateProduct, deleteProduct };