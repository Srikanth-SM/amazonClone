import Sequelize from 'sequelize';
import sequelize from '../db';

sequelize.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL
  }
})

const Product = sequelize.models.product;

export default Product;