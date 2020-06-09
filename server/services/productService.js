import Product from '../models/products';
import Category from '../models/category';
import Sequelize from 'sequelize';
import sequelize from '../db';

const addProduct = async (productToAdd) => {
  try {
    const { name, price, category } = productToAdd;
    let savedCategory = await Category.findOne({ where: { name: category } });
    console.log(savedCategory)
    if (!savedCategory) {
      savedCategory = await new Category({ name: category }).save();
    }
    const product = new Product({ name, price, categoryId: savedCategory.id });
    const savedProduct = await product.save();
    return savedProduct;
  } catch (e) {
    console.log(e);
  }
};

const getAllProducts = async () => {
  console.log('getAllProducts')
  try {
    return await Product.findAll({ include: sequelize.models.category });
  }
  catch (err) {
    throw new Error(err);
  }
}

const getProduct = async (id) => {
  try {
    return await Product.findByPk(id);
  }
  catch (err) {
    throw new Error(err)
  }
}

export default { addProduct, getProduct, getAllProducts };
