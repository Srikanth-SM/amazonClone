import mongoose from 'mongoose';

// var mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  product: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    },
  ],
});
// const Cart = mongoose.model('Cart', cartSchema);
export default mongoose.model('Cart', cartSchema);
