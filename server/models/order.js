import Sequelize from 'sequelize';
import sequelize from '../db';
import OrderItem from '../models/orderItem';
import User from '../models/user';


sequelize.define('order', {
    status: { type: Sequelize.ENUM('PLACED', 'SHIPPED', 'CANCELLED', 'DELIVERED'), defaultValue: 'PLACED', allowNull: false },

})

const Order = sequelize.models.order;
Order.hasMany(OrderItem, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
User.hasMany(Order, {
    foreignKey: {
        name: 'userEmail',
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
})
Order.belongsTo(User);
OrderItem.belongsTo(Order)

export default Order;