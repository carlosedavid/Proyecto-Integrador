const express = require('express');
const app = express();
const port = 3000;
const productsModel = require('./products');

app.use(express.json());
app.use(express.static('../public'));


app.get('/api/products', async (req, res) => {
	const products = await productsModel.getProducts();
	res.json(products);
});

app.get('/api/products/:id', async (req, res) => {
	const productId = req.params.id;
	const product = await productsModel.getProduct(productId);
	res.json(product);
});

app.post('/api/products', async (req, res) => {
	const newProduct = req.body;
	const createdProduct = await productsModel.createProduct(newProduct);
	res.json(createdProduct);
});

app.put('/api/products/:id', async (req, res) => {
	const productId = req.params.id;
	const updatedProduct = req.body;
	const result = await productsModel.updateProduct(productId, updatedProduct);
	res.json(result);
});

app.delete('/api/products/:id', async (req, res) => {
	const productId = req.params.id;
	const result = await productsModel.deleteProduct(productId);
	res.json(result);
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});


