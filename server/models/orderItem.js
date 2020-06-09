import Sequelize from 'sequelize';
import sequelize from '../db';
import Product from '../models/products';
import Order from '../models/order';

sequelize.define('orderitem', {
    quantity: Sequelize.INTEGER
})

const OrderItem = sequelize.models.orderitem;

Product.hasMany(OrderItem, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
OrderItem.belongsTo(Product);
export default OrderItem;