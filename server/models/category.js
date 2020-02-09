import Sequelize from 'sequelize';
import sequelize from '../db';
import Product from './products';

sequelize.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    set: function (val) {
      this.setDataValue('name', val.toLowerCase());
    }

  }
})

const Category = sequelize.models.category
Category.hasMany(Product, {
  foreignKey: {
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
});
Product.belongsTo(Category)

export default Category;
