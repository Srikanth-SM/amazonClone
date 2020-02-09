import Product from '../models/products';
import Category from '../models/category';

const addProduct = async (productToAdd) => {
  try {
    const { productName, department, imageurl, price, category } = productToAdd;
    const product = new Product();
    let savedCategory = await Category.findOne({ name: category });
    if (!savedCategory) {
      savedCategory = await new Category({ name: category }).save();
    }
    product.productName = productName;
    product.department = department;
    product.imageurl = imageurl;
    product.price = price;
    product.category.push(savedCategory._id);

    const savedProduct = await product.save();
    return savedProduct;
  } catch (e) {
    console.log(e);
  }
};

export default { addProduct };
