import Sequelize from 'sequelize';
import sequelize, { redis } from '../db'
import Product from '../models/products';
import Order from '../models/order';
import User from '../models/user';
import OrderItem from '../models/orderItem';
import logger from '../logger';


const updateCart = (user, productId, quantity) => {
  const { email } = user;
  let total = 0;
  let itemsInCart = {};
  return redis.hincrby(email, productId, quantity)
    .then((qty) => {
      if (qty <= 0) {
        return redis.hdel(email, productId);
      }
      return qty;
    })
    .then((qty) => {
      total = qty;
      return redis.hgetall(email)
    })
    .then((productsInCart) => {
      itemsInCart = productsInCart;
      return populateProductsFromDbUsingItemsInCart(itemsInCart)
    })
    .then((products) => {
      console.log(products)
      const modifiedProducts = products.map(product => {
        product.quantity = itemsInCart[product.id];
        const { id, name, price, createdAt, updatedAt, categoryId, quantity } = product
        return { id, name, price, createdAt, updatedAt, categoryId, quantity }
      })
      return modifiedProducts;
    })
    .catch(error => {

      throw new Error(error);
    })
};

async function populateProductsFromDbUsingItemsInCart(itemsInCart) {
  return await Promise.all(Object.keys(itemsInCart).map(async productId => {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('No Product with product id: ', productId);
    return product;
  }));
}

async function populateProductsInOrder(orderId) {
  console.log("inside populateProductsInOrder", orderId);

  const items = await OrderItem.findAll({
    where: {
      orderId: orderId
    }
  });
  console.log(items)
  if (!items || !items.length) throw new Error('No items with that orderId: ', orderId);
  // console.log(items);
  return items;
}

const placeOrder = async (user) => {
  console.log(user.email)
  try {
    let orderId = null;
    await sequelize.transaction(async (t) => {
      const cartItems = await redis.hgetall(user.email);
      if (Object.keys(cartItems).length) {
        let order = await Order.create({ userEmail: user.email }, { transaction: t });
        const itemsOrder = await Promise.all(Object.keys(cartItems).map(async item => {
          console.log('returning inside promise all', item);
          return await OrderItem.create({
            quantity: cartItems[item],
            productId: item,
            orderId: order.id
          }, { transaction: t })
        }))
        orderId = order.id;
      } else {
        throw new Error('No Items in cart')
      }
    })

    console.log(await OrderItem.findAll());
    console.log('calling populateProductsInOrder');
    const ss = await populateProductsInOrder(orderId);
    console.log('complete populateProductsInOrder');
    // throw new Error('testing transaction');
    console.log(JSON.stringify(ss, null, 2))
    // await redis.del(user.email);
    return ss;

  }
  catch (e) {
    throw new Error(e);
  }
  // const itemsInCart = null;
  // redis.hgetall(user.email)
  //   .then(productsInCart => {
  //     itemsInCart = productsInCart;
  //     return populateProductsFromDbUsingItemsInCart(productsInCart);
  //   })
  //   .then(populatedProducts => {
  //     populatedProducts.forEach(product => {
  //       product.quantity = itemsInCart[product.id];
  //     })
  //     return populated
  //   })
}

export default {
  updateCart,
  placeOrder

}