
const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');
const config = require('./config');

let memoryData = [];

async function getProducts() {
    if (config.persistenceType === 'mongodb') {
        const client = new MongoClient('mongodb://127.0.0.1:27017');
        await client.connect();
        const db = client.db('mydb');
        const products = await db.collection('products').find().toArray();
        await client.close();
        return products;
    } else if (config.persistenceType === 'memory') {
        return memoryData;
    } else if (config.persistenceType === 'file') {
        const data = fs.readFileSync('data.json', 'utf8');
        return JSON.parse(data);
    }
}

async function getProduct(productId) {
    if (config.persistenceType === 'mongodb') {
        const client = new MongoClient('mongodb://127.0.0.1:27017');
        await client.connect();
        const db = client.db('mydb');
        const product = await db.collection('products').findOne({ _id: new ObjectId(productId) });
        await client.close();
        return product;
    } else if (config.persistenceType === 'memory') {
        return memoryData.find(product => product._id === productId);
    } else if (config.persistenceType === 'file') {
        const data = fs.readFileSync('data.json', 'utf8');
        const products = JSON.parse(data);
        return products.find(product => product._id === productId);
    }
}

async function createProduct(product) {
    if (config.persistenceType === 'mongodb') {
        const client = new MongoClient('mongodb://127.0.0.1:27017');
        await client.connect();
        const db = client.db('mydb');
        const result = await db.collection('products').insertOne(product);
        await client.close();
        return result.ops[0];
    } else if (config.persistenceType === 'memory') {
        memoryData.push(product);
        return product;
    } else if (config.persistenceType === 'file') {
        const data = fs.readFileSync('data.json', 'utf8');
        const products = JSON.parse(data);
        products.push(product);
        fs.writeFileSync('data.json', JSON.stringify(products));
        return product;
    }
}

async function updateProduct(productId, product) {
    if (config.persistenceType === 'mongodb') {
        const client = new MongoClient('mongodb://127.0.0.1:27017');
        await client.connect();
        const db = client.db('mydb');
        const result = await db.collection('products').updateOne({ _id: new ObjectId(productId) }, { $set: product });
        await client.close();
        return result;
    } else if (config.persistenceType === 'memory') {
        const index = memoryData.findIndex(p => p._id === productId);
        if (index !== -1) {
            memoryData[index] = { ...memoryData[index], ...product };
            return memoryData[index];
        }
    } else if (config.persistenceType === 'file') {
        let data = fs.readFileSync("data.json", "utf8");
        let products = JSON.parse(data);
        let index = products.findIndex((p) => p._id === productId);
        if (index !== -1) {
            products[index] = { ...products[index], ...product };
            fs.writeFileSync("data.json", JSON.stringify(products));
            return products[index];
        }
    }
}

async function deleteProduct(productId) {
    if (config.persistenceType === 'mongodb') {
        const client = new MongoClient("mongodb://127.0.0.1:27017");
        await client.connect();
        const db = client.db("mydb");
        const result = await db.collection("products").deleteOne({ _id: new ObjectId(productId) });
        await client.close();
        return result;
    } else if (config.persistenceType === "memory") {
        let index = memoryData.findIndex((p) => p._id === productId);
        if (index !== -1) {
            memoryData.splice(index, 1);
            return { deletedCount: 1 };
        } else {
            return { deletedCount: 0 };
        }
    } else if (config.persistenceType === "file") {
        let data = fs.readFileSync("data.json", "utf8");
        let products = JSON.parse(data);
        let index = products.findIndex((p) => p._id === productId);
        if (index !== -1) {
            products.splice(index, 1);
            fs.writeFileSync("data.json", JSON.stringify(products));
            return { deletedCount: 1 };
        } else {
            return { deletedCount: 0 };
        }
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};



