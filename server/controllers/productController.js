import faker from 'faker';
// var faker = require("faker");
import Product from '../models/products';
import Category from '../models/category';
import productService from '../services/productService';
import productRoute from '../routes/productRoute';

console.log(__filename);
// var Products = require("../models/products");
// var Category = require("../models/category");

const productsLength = 30;

const category = new Category();
category.name = faker.commerce.department();
// category.save(cb);

function cb() {
  for (let i = 0; i < productsLength; i++) {
    const product = new Product();
    product.productName = `${faker.commerce.productName()}${i}`;
    product.product = faker.commerce.product();
    product.imageurl = faker.image.image();
    product.price = faker.commerce.price();
    product.category.push(category._id);
    product.save();
  }
}
// cb();

const get = (req, res) => {
  Product.find((err, results) => {
    if (err && !!results) {
      return res.send(err);
    }
    return res.send(results);
  });
};

const getProduct = (req, res) => {
  const { id } = req.params;
  Product.findById(id, (err, results) => {
    if (err && !!results) {
      return res.send(err);
    }
    return res.send(results);
  });
};

const addProduct = async (req, res) => {
  productService
    .addProduct(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export default {
  get,
  getProduct,
  addProduct,
};
